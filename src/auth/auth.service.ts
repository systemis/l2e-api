import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { UserDocument } from '@/user/entities/user.entity';
import {
  AuthModel,
  AuthDocument,
  PasswordCredential,
  HashingAlgorithm,
} from './entities/auth.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthJwt } from './entities/jwt.entity'
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { HasingService } from '@/providers/hashing';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection()
    private readonly connection: mongoose.Connection,

    @InjectModel(AuthModel.name)
    private AuthDocument: Model<AuthDocument>,

    private userService: UserService,

    private jwtService: JwtService,

    private hasingService: HasingService,
  ) { }

  async generateAccessToken(user: UserDocument) {
    const jwtPayload: AuthJwt = {
      id: user.id,
      username: user.username,
      email: user.email,
    }

    return {
      access_token: this.jwtService.sign(jwtPayload)
    };
  }

  async registerUser(registerUserDto: RegisterUserDto) {
    let user: UserDocument;
    let authEntity: AuthDocument;

    if (
      await this.userService.findByUsernameOrEmail(registerUserDto.username) ||
      await this.userService.findByUsernameOrEmail(registerUserDto.email)
    ) {
      throw new BadRequestException('USER::EXISTS::USERNAME::EMAIL');
    }

    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      user = await this.userService.createUser({
        avatar: registerUserDto.avatar,
        email: registerUserDto.email,
        username: registerUserDto.username,
        roles: registerUserDto.roles,
        displayName: registerUserDto.displayName,
      });

      let hashPassword = await bcrypt.hashSync(registerUserDto.credential.password, HashingAlgorithm.BCrypt);

      authEntity = await this.createAuthEntity({
        userId: user._id,
        credential: {
          password: hashPassword,
          algorithm: HashingAlgorithm.BCrypt,
        },
      })
    });

    await session.endSession();
    return {
      user,
      authEntity,
    };
  }

  async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
    try {
      const { user } = await this.verifyPassword(
        userId,
        updatePasswordDto.oldPassword
      );

      await this.AuthDocument.deleteOne({ userId: user._id });
      const session = await this.connection.startSession();
      await session.withTransaction(async () => {
        await this.createAuthEntity({
          userId: user._id,
          credential: {
            algorithm: HashingAlgorithm.BCrypt,
            password: updatePasswordDto.newPassword,
          }
        });
      });
      await session.endSession();
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        throw new BadRequestException('UPDATEPASSWORD::FAILED:INCORRECT::OLDPASSWORD');
      }
      throw err;
    }
  }

  async verifyPassword(userId: string, rawPassword: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException()

    const auth = await this.findAuthEntityWithUserId(user.id);
    if (!auth) throw new UnauthorizedException();

    const { credential } = auth as {
      id: string;
      credential: PasswordCredential,
    };

    if (credential.algorithm !== HashingAlgorithm.BCrypt)
      throw new UnauthorizedException();

    const hasher = this.hasingService.getHasher(credential.algorithm);

    const isHashValid = await hasher.compare(rawPassword, credential.password);

    if (!isHashValid) throw new UnauthorizedException();

    return { user };
  }

  async createAuthEntity(createAuthDto: CreateAuthDto) {
    const auth = new this.AuthDocument(createAuthDto);
    const newAuth = await auth.save();
    return newAuth;
  }

  async findAuthEntityWithUserId(userId: string) {
    return this.AuthDocument.findOne({
      userId
    });
  }
}

import { 
  Injectable, 
  NotFoundException, 
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@/user/user.service';
import { UserDocument, UserModel } from '@/user/entities/user.entity';
import { 
  AuthModel, 
  AuthDocument, 
  PasswordCredential, 
  HashingAlgorithm, 
} from './entities/auth.entity';
import { AuthJwt } from './entities/jwt.entity'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HasingService } from '@/providers/hashing';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel.name)
    private AuthDocument: Model<AuthDocument>,

    private userService: UserService,
    
    private jwtService: JwtService, 

    private hasingService: HasingService, 
  ) {}

  async generateAccessToken(user: UserDocument) {
    const jwtPayload:AuthJwt = { 
      id: user.id, 
      username: user.username,
      email: user.email, 
    }

    return {
      access_token: this.jwtService.sign(jwtPayload)
    };
  }

  async verifyPassword(userId: string, rawPassword: string) {
    const user = await this.userService.findById(userId); 
    if (!userId) throw new NotFoundException()
    
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

  async findAuthEntityWithUserId(userId: string) {
    return this.AuthDocument.findOne({
      userId
    });
  }
}

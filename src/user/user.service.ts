import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserDocument,
  UserModel,
} from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private UserDocument: Model<UserDocument>
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    const user = new this.UserDocument(createUserDto);
    const newUser = await user.save();
    return newUser;
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto) {
    if (!await this.findById(userId)) throw new NotFoundException();

    if (
      await this.findByUsernameOrEmail(updateUserDto.username) ||
      await this.findByUsernameOrEmail(updateUserDto.email)
    ) {
      throw new BadRequestException('USER::EXIST:USERNAME:EMAIL');
    }

    const updatedPayload = {
      $set: updateUserDto
    };

    await this.UserDocument.updateOne({ id: userId }, updatedPayload);
    return this.findById(userId);
  }

  async findByUsernameOrEmail(query: string) {
    return this.UserDocument.findOne({
      $or: [{ email: query }, { username: query }]
    });
  };

  async findById(id: string) {
    return this.UserDocument.findById(id);
  }
}

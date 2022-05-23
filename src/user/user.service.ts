import { 
  Injectable, 
  ConsoleLogger, 
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { 
  UserDocument, 
  UserModel, 
  User 
} from './entities/user.entity';

@Injectable()
export class UserService {
  private users:User[] = [];
  
  constructor(
    @InjectModel(UserModel.name)
    private UserDocument: Model<UserDocument>
  ) {}

  async findByUsernameOrEmail(query: string) {
    return this.UserDocument.findOne({
      $or: [ {email: query}, { username: query }]
    });
  }; 

  async findById(id: string) {
    return this.UserDocument.findById(id);
  }
}

import { 
  Injectable, 
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { 
  UserDocument, 
  UserModel, 
} from './entities/user.entity';

@Injectable()
export class UserService {
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

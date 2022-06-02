import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel, UserDocument } from '@/user/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(UserModel.name)
    private UserDocument: Model<UserDocument>
  ) {}
}

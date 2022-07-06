import { Injectable } from '@nestjs/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  user = 'UserRole::User',
  admin = 'UserRole::SystemAdmin',
}

export class User {
  username: string;
  email: string;
  roles: string[];
  displayName: string;
  avatar: string;
}
@Injectable()
@Schema({ timestamps: true, autoIndex: true })
export class UserModel implements User {
  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  displayName: string;

  @Prop({ type: String })
  avatar: string;

  @Prop({ type: Array, enum: UserRole, default: [UserRole.user] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

export type UserDocument = User & Document;

import { Injectable } from '@nestjs/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum ChainType {
  evm = 'CHAIN_TYPE::EVM_CHAIN',
  sol = 'CHAIN_TYPE::SOL_CHAIN',
}

export enum UserRole {
  user = 'UserRole::User',
  admin = 'UserRole::SystemAdmin',
}

export class WalletCredential {
  walletAddress: string;
  chainType: ChainType;
}

export class User {
  username: string;
  email: string;
  roles: string[];
  avatar: string;
  gpa: number;
  credit: number;
  class: string;
  walletCredential: WalletCredential;
  balance: number;
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

  @Prop({ type: Number })
  gpa: number;

  @Prop({ type: Number })
  credit: number;

  @Prop({ type: String })
  class: string;

  @Prop({ type: Number, default: 0 })
  balance: number;

  @Prop({ type: WalletCredential })
  walletCredential: WalletCredential;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

export type UserDocument = User & Document;

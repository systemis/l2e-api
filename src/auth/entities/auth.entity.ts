import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Injectable } from '@nestjs/common';

export enum HashingAlgorithm {
  BCrypt=10,
}

export type PasswordCredential = {
  password: string; 
  algorithm: HashingAlgorithm;
}

export class Auth {
  public userId: string; 
  public credential: PasswordCredential;
}

@Injectable()
@Schema({ timestamps: true, autoIndex: true })
export class AuthModel implements Auth {
  @Prop({ type: String })
  userId: string; 

  @Prop({ type: Object })
  credential: PasswordCredential;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);

export type AuthDocument = Auth & Document;
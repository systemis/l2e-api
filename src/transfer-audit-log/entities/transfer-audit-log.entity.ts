import { Injectable } from '@nestjs/common';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TransferType {
  buyItem = 'TRANSFERTYPE::BUYITEM',
  reward = 'TRANSFERTYPE::REWARD',
}

export class TransferAuditLog {
  from: string;
  to: string;
  type: string;
  amount: number;
}

@Injectable()
@Schema({ timestamps: true, autoIndex: true })
export class TransferAuditLogModel implements TransferAuditLog {
  @Prop({ type: String, required: true })
  from: string;

  @Prop({ type: String, required: true })
  to: string;

  @Prop({ type: String, enum: TransferType, required: true })
  type: string;

  @Prop({ type: Number, required: true })
  amount: number;
}

export const TransferAuditLogSchema = SchemaFactory.createForClass(
  TransferAuditLogModel,
);

export type TransferAuditLogDocument = TransferAuditLog & Document;

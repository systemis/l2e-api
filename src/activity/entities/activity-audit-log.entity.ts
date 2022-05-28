import { Injectable } from '@nestjs/common';
import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export class ActivityAuditLog {
  activityId: string; 
  userId: string; 
}

@Injectable()
@Schema({ timestamps: true, autoIndex: true })
export class ActivityAuditLogModel implements ActivityAuditLog {
  @Prop({ required: true, type: String })
  activityId: string;
  
  @Prop({ required: true, type: String })
  userId: string;
}

export const ActivityAuditLogSchema = SchemaFactory.createForClass(ActivityAuditLogModel);

export type ActivityAuditLogDocument = ActivityAuditLog & Document;
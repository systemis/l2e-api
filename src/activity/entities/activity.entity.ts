import { Injectable } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Activity {
  title: string; 
  decs: string; 
  credit: number; 
  author: string;
}

@Injectable() 
@Schema({ timestamps: true, autoIndex: true }) 
export class ActivityModel implements Activity {
  @Prop({ required: true, type: String })
  title;
  @Prop({ required: true, type: String })
  decs;
  @Prop({ required: true, type: Number })
  credit;
  @Prop({ required: true, type: String })
  author;
}

export const ActivitySchema = SchemaFactory.createForClass(ActivityModel);

export type ActivityDocument = Activity & Document;
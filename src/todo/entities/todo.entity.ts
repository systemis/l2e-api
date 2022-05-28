import { Injectable } from '@nestjs/common';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from "mongoose";

export enum TodoStatus {
  done='TODO::STATUS::DONE',
  processing='TODO::STATUS::PROCESSING',
  archive='TODO::STATUS::ARCHIVE',
}

export class Todo {
  title: string;
  desc: string;
  userId: string;
  status: string;
}

@Injectable()
@Schema({ timestamps: true, autoIndex: true })
export class TodoModel implements Todo {
  @Prop({ required: true, type: String })
  title: string; 

  @Prop({ type: String })
  desc: string; 

  @Prop({ required: true, type: String}) 
  userId: string; 

  @Prop({ type: String, enum: TodoStatus, default: TodoStatus.processing })
  status: string;
}

export const TodoSchema = SchemaFactory.createForClass(TodoModel);

export type TodoDocument = Todo & Document;
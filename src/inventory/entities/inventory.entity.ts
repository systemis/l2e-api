import { Injectable } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum InventoryType {
  ticket = 'INVENTORY_TYPE::TICKET',
  drink = 'INVENTORY_TYPE::DRINK',
}

export class Inventory {
  title: string;
  image: string;
  price: number;
  type: InventoryType;
  interactions: string[];
  amount: number;
}

export type InventoryOwn = Inventory & {
  ownedAmount: number;
};

@Injectable()
@Schema({ timestamps: true, autoIndex: true })
export class InventoryModel implements Inventory {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  image: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, enum: InventoryType })
  type: InventoryType;

  @Prop({ type: Array, default: [] })
  interactions: string[];

  @Prop({ required: true, type: Number })
  amount: number;
}

export const InventorySchema = SchemaFactory.createForClass(InventoryModel);

export type InventoryDocument = Inventory & Document;

import { Injectable } from '@nestjs/common';
import { Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum InventoryStatus {
  available = 'INVENTORY_STATUS::AVAILABLE',
  used = 'INVENTORY_STATUS::USED',
}

export class InventoryAuditLog {
  inventoryId: string;
  userId: string;
  status: InventoryStatus;
}

@Injectable()
@Schema({ timestamps: true, autoIndex: true })
export class InventoryAuditLogModel implements InventoryAuditLog {
  @Prop({ required: true, type: String })
  inventoryId: string;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ enum: InventoryStatus, default: InventoryStatus.available })
  status: InventoryStatus;
}

export const InventoryAuditLogSchema = SchemaFactory.createForClass(
  InventoryAuditLogModel,
);

export type InventoryAuditDocument = InventoryAuditLog & Document;

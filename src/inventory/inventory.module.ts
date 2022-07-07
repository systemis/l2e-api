import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModel, TodoSchema } from '@/todo/entities/todo.entity';
import { UserModel, UserSchema } from '@/user/entities/user.entity';
import { AuthModel, AuthSchema } from '@/auth/entities/auth.entity';
import {
  ActivityModel,
  ActivitySchema,
} from '@/activity/entities/activity.entity';
import {
  ActivityAuditLogModel,
  ActivityAuditLogSchema,
} from '@/activity/entities/activity-audit-log.entity';
import {
  InventoryModel,
  InventorySchema,
} from '@/inventory/entities/inventory.entity';
import {
  InventoryAuditLogModel,
  InventoryAuditLogSchema,
} from '@/inventory/entities/inventory-audit-log.entity';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: TodoModel.name, schema: TodoSchema },
      { name: AuthModel.name, schema: AuthSchema },
      { name: ActivityModel.name, schema: ActivitySchema },
      { name: ActivityAuditLogModel.name, schema: ActivityAuditLogSchema },
      { name: InventoryModel.name, schema: InventorySchema },
      { name: InventoryAuditLogModel.name, schema: InventoryAuditLogSchema },
    ]),
    UserModule,
  ],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService],
})
export class InventoryModule {}

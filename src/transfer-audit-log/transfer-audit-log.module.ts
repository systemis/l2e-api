import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModel, TodoSchema } from '@/todo/entities/todo.entity';
import { UserModel, UserSchema } from '@/user/entities/user.entity';
import { AuthModel, AuthSchema } from '@/auth/entities/auth.entity';
import { ActivityModel, ActivitySchema } from '@/activity/entities/activity.entity';
import { ActivityAuditLogModel, ActivityAuditLogSchema } from '@/activity/entities/activity-audit-log.entity';
import { TransferAuditLogModel, TransferAuditLogSchema } from '@/transfer-audit-log/entities/transfer-audit-log.entity';
import { TransferAuditLogService } from './transfer-audit-log.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: TodoModel.name, schema: TodoSchema },
      { name: AuthModel.name, schema: AuthSchema },
      { name: ActivityModel.name, schema: ActivitySchema },
      { name: ActivityAuditLogModel.name, schema: ActivityAuditLogSchema },
      { name: TransferAuditLogModel.name, schema: TransferAuditLogSchema },
    ]),
  ],
  providers: [TransferAuditLogService],
  exports: [TransferAuditLogService]
})
export class TransferAuditLogModule { }

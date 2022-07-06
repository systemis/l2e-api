import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: TodoModel.name, schema: TodoSchema },
      { name: AuthModel.name, schema: AuthSchema },
      { name: ActivityModel.name, schema: ActivitySchema },
      { name: ActivityAuditLogModel.name, schema: ActivityAuditLogSchema },
    ]),
  ],
  providers: [ActivityService],
  controllers: [ActivityController],
  exports: [ActivityService],
})
export class ActivityModule {}

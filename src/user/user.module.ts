import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
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
import { ActivityService } from '@/activity/activity.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: TodoModel.name, schema: TodoSchema },
      { name: AuthModel.name, schema: AuthSchema },
      { name: ActivityModel.name, schema: ActivitySchema },
      { name: ActivityAuditLogModel.name, schema: ActivityAuditLogSchema },
    ]),
  ],
  providers: [UserService, ActivityService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

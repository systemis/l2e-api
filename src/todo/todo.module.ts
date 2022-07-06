import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
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
  providers: [TodoService],
  controllers: [TodoController],
  exports: [TodoService],
})
export class TodoModule {}

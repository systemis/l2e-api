import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '@/user/entities/user.entity';
import { AuthModel, AuthSchema } from '@/auth/entities/auth.entity';
import { TodoModel, TodoSchema } from '@/todo/entities/todo.entity';
import { ActivityModel, ActivitySchema } from '@/activity/entities/activity.entity';
import { ActivityAuditLogModel, ActivityAuditLogSchema } from '@/activity/entities/activity-audit-log.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    ConfigModule, 
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: AuthModel.name, schema: AuthSchema },
      { name: TodoModel.name, schema: TodoSchema },
      { name: ActivityModel.name, schema: ActivitySchema }, 
      { name: ActivityAuditLogModel.name, schema: ActivityAuditLogSchema }, 
    ]),
  ], 
  providers: [AdminService], 
  exports: [AdminService], 
  controllers: [AdminController], 
})
export class AdminModule {}

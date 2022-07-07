import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { HasingService } from '@/providers/hashing';
import { UserModel, UserSchema } from '@/user/entities/user.entity';
import { AuthModel, AuthSchema } from '@/auth/entities/auth.entity';
import { TodoModel, TodoSchema } from '@/todo/entities/todo.entity';
import {
  ActivityModel,
  ActivitySchema,
} from '@/activity/entities/activity.entity';
import {
  ActivityAuditLogModel,
  ActivityAuditLogSchema,
} from '@/activity/entities/activity-audit-log.entity';
import { UserModule } from '@/user/user.module';
import { AuthModule } from '@/auth/auth.module';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [
    JwtModule,
    ConfigModule,
    UserModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: AuthModel.name, schema: AuthSchema },
      { name: TodoModel.name, schema: TodoSchema },
      { name: ActivityModel.name, schema: ActivitySchema },
      { name: ActivityAuditLogModel.name, schema: ActivityAuditLogSchema },
    ]),
  ],
  providers: [AdminService, HasingService],
  exports: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}

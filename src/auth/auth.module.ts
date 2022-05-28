import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '@/constants/jwt';
import { UserModule } from '@/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '@/user/entities/user.entity';
import { AuthModel, AuthSchema } from '@/auth/entities/auth.entity';
import { TodoModel, TodoSchema } from '@/todo/entities/todo.entity';
import { ActivityModel, ActivitySchema } from '@/activity/entities/activity.entity';
import { ActivityAuditLogModel, ActivityAuditLogSchema } from '@/activity/entities/activity-audit-log.entity';
import { HasingService } from '@/providers/hashing';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [
    AuthService, 
    LocalStrategy, 
    JwtStrategy, 
    HasingService,
  ],
  imports: [
    ConfigModule, 
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: AuthModel.name, schema: AuthSchema },
      { name: TodoModel.name, schema: TodoSchema },
      { name: ActivityModel.name, schema: ActivitySchema }, 
      { name: ActivityAuditLogModel.name, schema: ActivityAuditLogSchema }, 
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    UserModule,
    PassportModule,
  ],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
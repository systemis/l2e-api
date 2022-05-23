import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from '@/user/entities/user.entity';
import { AuthModel, AuthSchema } from '@/auth/entities/auth.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    ConfigModule, 
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema },
      { name: AuthModel.name, schema: AuthSchema },
    ]),
  ], 
  providers: [UserService], 
  exports: [UserService], 
  controllers: [UserController], 
})
export class UserModule {}

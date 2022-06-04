import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { getMemoryServerMongoDbUri } from './helper';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ActivityModule } from './activity/activity.module';
import { TodoModule } from './todo/todo.module';
import { AdminModule } from './admin/admin.module';
import { TransferAuditLogModule } from './transfer-audit-log/transfer-audit-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        let uri;
        try {
          const env = configService.get<string>('NODE_ENV');
          if (env === 'test') {
            uri = await getMemoryServerMongoDbUri();
          } else {
            uri = configService.get<string>('MONGO_URI');
          }
        } catch { };
        if (!uri) uri = process.env.MONGO_URI;

        return { uri };
      }
    }),
    AuthModule,
    AdminModule,
    UserModule,
    ActivityModule,
    TodoModule,
    TransferAuditLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', 
    }), 
    MongooseModule.forRootAsync({
      imports: [ ConfigModule ],
      useFactory: async (configService: ConfigService) => {
        let uri; 
        try {
          const env = configService.get<string>('NODE_ENV');
          if (env === 'test') {
            uri = getMemoryServerMongoDbUri();
          } else {
            uri = configService.get<string>('MONGO_URI');
          }
        } catch {};
        if (!uri) uri = process.env.MONGO_URI;
        console.log(uri);
        return { uri };
      }
    }),
    AuthModule, 
    UserModule, 
    ActivityModule, 
    TodoModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

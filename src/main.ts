import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as expressListRoutes from 'express-list-routes';

export const globalApply = async (app) => {
  app.setGlobalPrefix('api/');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await globalApply(app);

  const config = new DocumentBuilder()
    .setTitle('AppChain NestJs Starter Broker API')
    .setDescription('Todo: update description')
    .setVersion('1.0')
    .addTag('L2E')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) =>
      methodKey,
  });

  SwaggerModule.setup('api', app, document);


  await app.listen(3000);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  console.log(expressListRoutes({}, 'API:', router));
}
bootstrap();

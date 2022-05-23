import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const globalApply = async (app) => {
  app.setGlobalPrefix('api/');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await globalApply(app);
  await app.listen(3000);
}
bootstrap();

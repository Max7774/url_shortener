import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: true },
  });

  app.use('../uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors({ credentials: true, origin: true });
  await app.listen(3001);
}
bootstrap();

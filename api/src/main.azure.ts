import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { verifyTrainData } from './main';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // Import/populate the database if needed
  await verifyTrainData();

  await app.init();
  return app;
}

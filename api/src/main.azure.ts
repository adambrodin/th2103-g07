import { HttpService } from '@nestjs/axios';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrainDataImporter } from './misc/train-data-importer';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api'); // GLOBAL ROUTE, CONTROLLERS ALWAYS START WITH /API/<CONTROLLER ROUTE>
  app.useGlobalPipes(new ValidationPipe());

  const _httpService = new HttpService();
  // Import/populate the database if needed
  const dataImporter = new TrainDataImporter(_httpService);
  await dataImporter.importTrainData();

  await app.init();
  return app;
}

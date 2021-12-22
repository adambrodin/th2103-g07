import { HttpService } from '@nestjs/axios';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrainDataImporter } from './misc/train-data-importer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api'); // GLOBAL ROUTE, CONTROLLERS ALWAYS START WITH /API/<CONTROLLER ROUTE>
  app.useGlobalPipes(new ValidationPipe());

  const _httpService = new HttpService();
  // Import/populate the database if needed
  const dataImporter = new TrainDataImporter(_httpService);
  await dataImporter.importTrainData();

  await app.listen(1337);
}

bootstrap();

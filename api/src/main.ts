import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { getRepository } from 'typeorm';
import { AppModule } from './app.module';
import { TrainStopEntity } from './entities/train-stop.entity';
import { TrainDataImporter } from './misc/train-data-importer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // GLOBAL ROUTE, CONTROLLERS ALWAYS START WITH /API/<CONTROLLER ROUTE>
  app.useGlobalPipes(new ValidationPipe());

  // Import/populate the database if needed
  await verifyTrainData();

  await app.listen(1337);
}

export async function verifyTrainData() {
  const availableTrainStops = await getRepository(TrainStopEntity).count();
  if (availableTrainStops <= 0) {
    const dataImporter = new TrainDataImporter();
    await dataImporter.importTrainData();
  }
}

bootstrap();

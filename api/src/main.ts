import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // GLOBAL ROUTE, CONTROLLERS ALWAYS START WITH /API/<CONTROLLER ROUTE>
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(1337);
}
bootstrap();

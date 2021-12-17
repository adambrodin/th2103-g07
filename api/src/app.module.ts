import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';
import { TrainDataService } from './services/train-data.service';

@Module({
  // TypeOrm database credentials come from environment variables
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    HttpModule,
  ],
  controllers: [BookingController],
  providers: [BookingService, TrainDataService],
})
export class AppModule {}

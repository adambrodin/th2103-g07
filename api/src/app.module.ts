import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';
import { TrafikverketService } from './services/trafikverket.service';
import { StationController } from './controllers/station.controller';
import { StationService } from './services/station.service';
import { TripService } from './services/trip.service';
import { EmailService } from './services/mailer.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { PriceService } from './services/price.service';
import { StripeController } from './controllers/stripe.controller';

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
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true, // upgrade later with STARTTLS
          auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
          },
        },
        defaults: {
          from: '"no-reply" <noreply@grupp7.com>',
        },
        template: {
          dir: process.cwd() + '/src/mail/templates',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: false,
          },
        },
      }),
    }),
  ],
  controllers: [BookingController, StationController, StripeController],
  providers: [
    BookingService,
    TrafikverketService,
    StationService,
    TripService,
    EmailService,
    PriceService,
  ],
})
export class AppModule {}

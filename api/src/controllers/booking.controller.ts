import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { TripSearchDto } from '@shared/dtos/trip-search.dto';
import { BookTripDto } from '@shared/dtos/book-trip.dto';
import { EmailService } from 'src/services/mailer.service';

@Controller('booking')
export class BookingController {
  constructor(
    private readonly _bookingService: BookingService, 
    private readonly _mailerService: EmailService) {}

  @Post('search')
  async searchAvailableTrips(@Body() body: TripSearchDto) {
    const outboundTrips = await this._bookingService.getAvailableTrips([
      body.departure,
      body.arrival,
    ]);
    await this._mailerService.sendConfirmation();
    let returnTrips;
    if (body.returnDeparture != null && body.returnArrival != null) {
      returnTrips = await this._bookingService.getAvailableTrips([
        body.returnDeparture,
        body.returnArrival,
      ]);
    }

    if (outboundTrips?.error != null || returnTrips?.error != null) {
      return {
        response: 'An error occurred whilst fetching available trips.',
        error: [outboundTrips?.error, returnTrips?.error],
      };
    }
    
    if (outboundTrips.trips.length > 0) {
      return {
        response: 'Trips have been fetched successfully.',
        data: {
          OutboundTrips: outboundTrips.trips,
          ReturnTrips: returnTrips?.trips,
        },
      };
    } else {
      return { response: 'No trips were found for the given criteria.' };
    }
  }

  @Post('reservation')
  async bookTrip(@Body() body: BookTripDto) {
    const bookingResult = await this._bookingService.bookTrip(body);

    if (bookingResult?.error != null || bookingResult?.receipt == null) {
      return {
        response: 'Booking was unable to process.',
        error:
          bookingResult?.error == null
            ? 'An unknown error occurred.'
            : bookingResult?.error,
      };
    }
    await this._mailerService.sendConfirmation();
    return {
      response: 'Trip has been booked successfully.',
      data: { receipt: bookingResult.receipt },
    };
  }
}

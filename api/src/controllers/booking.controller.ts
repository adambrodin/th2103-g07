import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { TripSearchDto } from '@shared/dtos/trip-search.dto';
import { BookTripDto } from '@shared/dtos/book-trip.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly _bookingService: BookingService) {}

  @Post('search')
  async searchAvailableTrips(@Body() body: TripSearchDto) {
    const fetchedTrips = await this._bookingService.getAvailableTrips(body);
    const fetchedReturnTrips =
      await this._bookingService.getAvailableReturnTrips(body);

    if (fetchedTrips?.error != null) {
      return {
        response: 'An error occurred whilst fetching available trips.',
        error: fetchedTrips?.error,
      };
    }

    if (fetchedTrips.trips.length > 0 && fetchedReturnTrips.trips.length > 0) {
      return {
        response: 'Trips have been fetched successfully.',
        data: {
          outboundTrip: fetchedTrips.trips,
          returnTrip: fetchedReturnTrips.trips,
        },
      };
    } else if (fetchedTrips.trips.length > 0) {
      return {
        response: 'Trips have been fetched successfully.',
        data: {
          outboundTrip: fetchedTrips.trips,
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

    return {
      response: 'Trip has been booked successfully.',
      data: bookingResult.receipt,
    };
  }
}

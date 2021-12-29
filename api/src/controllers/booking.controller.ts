import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { TripSearchDto } from '@shared/dtos/trip-search.dto';
import { BookTripDto } from '@shared/dtos/book-trip.dto';
import { BookingDto } from '@shared/dtos/booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly _bookingService: BookingService) {}

  @Post('search')
  async searchAvailableTrips(@Body() body: TripSearchDto) {
    const outboundTrips = await this._bookingService.getAvailableTrips([
      body.departure,
      body.arrival,
    ]);

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
        error: [outboundTrips?.error, returnTrips?.error].filter(
          (err) => err != null,
        ),
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

    return {
      response: 'Trip has been booked successfully.',
      data: { receipt: bookingResult.receipt },
    };
  }

  @Post()
  async getBookedTrip(@Body() body: BookingDto) {
    const bookedTrip = await this._bookingService.getBookedTrip(body);

    if (bookedTrip?.error != null || bookedTrip?.trip == null) {
      return {
        response: 'Booking could not be found.',
        error:
          bookedTrip?.error == null
            ? 'An unknown error occurred.'
            : bookedTrip?.error,
      };
    }

    return {
      response: 'Booking has been fetched successfully.',
      data: { booking: bookedTrip.trip },
    };
  }

  @Post('cancel')
  async cancelBooking(@Body() body: BookingDto) {
    const cancelRes = await this._bookingService.cancelBooking(body);

    if (cancelRes?.error != null || cancelRes?.booking == null) {
      return {
        response: 'Booking could not be canceled.',
        error:
          cancelRes?.error == null
            ? 'An unknown error occurred.'
            : cancelRes?.error,
      };
    }

    return {
      response: 'Booking has been canceled successfully.',
      data: { canceledBooking: cancelRes.booking },
    };
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { BookingDto } from '@shared/dtos/booking.dto';
import { TripResponse } from '@shared/models/trip-response';
import { TripSearchDto } from '@shared/dtos/requests/trip-search-request.dto';
import { BookTripRequestDto } from '@shared/dtos/requests/book-trip-request.dto';
import { EmailService } from 'src/services/mailer.service';
@Controller('booking')
export class BookingController {
  constructor(
    private readonly _bookingService: BookingService, 
    private readonly _mailerService: EmailService) {}

  @Post('search')
  async searchAvailableTrips(@Body() body: TripSearchDto) {
    const outboundTrips = await this._bookingService.getAvailableTrips(body);

    let returnTrips: { error?: string; trips?: TripResponse[] };
    if (body.returnDeparture != null && body.returnArrival != null) {
      returnTrips = await this._bookingService.getAvailableTrips(body);
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
  async bookTrip(@Body() body: BookTripRequestDto) {
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

    const receipt = await this._bookingService.createFormattedReceipt(
      bookingResult.receipt,
    );

    return {
      response: 'Trip has been booked successfully.',
      data: receipt,
    };
  }

  /**
   *
   * @param body contains email and id of booking
   * @returns a receipt that contains all the contents of the booking (tickets, pricing, start/end destination etc)
   */
  @Post()
  async getBookedTrip(@Body() body: BookingDto) {
    const receiptFromBooking = await this._bookingService.getBookedReceipt(
      body,
    );

    if (
      receiptFromBooking?.error != null ||
      receiptFromBooking?.receipt == null
    ) {
      return {
        response: 'Booking could not be found.',
        error:
          receiptFromBooking?.error == null
            ? 'An unknown error occurred.'
            : receiptFromBooking?.error,
      };
    }

    const receipt = await this._bookingService.createFormattedReceipt(
      receiptFromBooking.receipt,
    );

    return {
      response: 'Booking has been fetched successfully.',
      data: receipt,
    };
  }

  @Post('cancel')
  async cancelBooking(@Body() body: BookingDto) {
    const cancelRes = await this._bookingService.cancelBooking(body);

    if (cancelRes?.error != null || cancelRes?.receipt == null) {
      return {
        response: 'Booking could not be canceled.',
        error:
          cancelRes?.error == null
            ? 'An unknown error occurred.'
            : cancelRes?.error,
      };
    }

    const receipt = await this._bookingService.createFormattedReceipt(
      cancelRes.receipt,
    );

    return {
      response: 'Booking has been canceled successfully.',
      data: { canceledBooking: receipt },
    };
  }
}

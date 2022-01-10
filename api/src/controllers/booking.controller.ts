import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { BookingDto } from '@shared/dtos/booking.dto';
import { TripResponse } from '@shared/models/trip-response';
import { TripSearchDto } from '@shared/dtos/requests/trip-search-request.dto';
import { BookTripRequestDto } from '@shared/dtos/requests/book-trip-request.dto';
import { PriceService } from 'src/services/price.service';
import { EmailService } from 'src/services/mailer.service';
// import { ReceiptResponseDto } from '@shared/dtos/responses/receipt-response.dto';
declare function require(name: string);

@Controller('booking')
export class BookingController {
  constructor(
    private readonly _bookingService: BookingService,
    private readonly _mailerService: EmailService,
  ) {}
  private getTotalPrice: PriceService = new PriceService();
  Stripe = require('stripe');
  stripe = this.Stripe(process.env.STRIPE_PRIVATE_KEY);

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

    const receipt = await this._bookingService.createFormattedReceipt(
      bookingResult.receipt,
    );

    await this._mailerService.sendConfirmation(
      receipt,
      bookingResult.receipt.booking.customer,
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

  @Post('create-checkout-session')
  async checkoutSession(@Body() body: any) {
    try {
      const ticketPrice: number[] =
        await this.getTotalPrice.getAllTicketPrices();
      const seatPrice = await this.getTotalPrice.getAllSeatPrices();

      if (seatPrice[0] * ticketPrice[0] === 0) {
        return {
          response: 'Somthing went wrong',
        };
      }

      //priset är i öre
      const storeItems = new Map([
        [
          1,
          {
            priceInSek: Math.round(seatPrice[0] * ticketPrice[0] * 100),
            name: 'Adult First Class',
          },
        ],
        [
          2,
          {
            priceInSek: Math.round(seatPrice[1] * ticketPrice[0] * 100),
            name: 'Adult Second Class',
          },
        ],
        [
          3,
          {
            priceInSek: Math.round(seatPrice[2] * ticketPrice[0] * 100),
            name: 'Adult Animal',
          },
        ],
        [
          4,
          {
            priceInSek: Math.round(seatPrice[3] * ticketPrice[0] * 100),
            name: 'Adult Quiet',
          },
        ],
        [
          5,
          {
            priceInSek: Math.round(seatPrice[0] * ticketPrice[1] * 100),
            name: 'Student First Class',
          },
        ],
        [
          6,
          {
            priceInSek: Math.round(seatPrice[1] * ticketPrice[1] * 100),
            name: 'Student Second Class',
          },
        ],
        [
          7,
          {
            priceInSek: Math.round(seatPrice[2] * ticketPrice[1] * 100),
            name: 'Student Animal',
          },
        ],
        [
          8,
          {
            priceInSek: Math.round(seatPrice[3] * ticketPrice[1] * 100),
            name: 'Student Quiet',
          },
        ],
        [
          9,
          {
            priceInSek: Math.round(seatPrice[0] * ticketPrice[2] * 100),
            name: 'Senior First Class',
          },
        ],
        [
          10,
          {
            priceInSek: Math.round(seatPrice[1] * ticketPrice[2] * 100),
            name: 'Senior Second Class',
          },
        ],
        [
          11,
          {
            priceInSek: Math.round(seatPrice[2] * ticketPrice[2] * 100),
            name: 'Senior Animal',
          },
        ],
        [
          12,
          {
            priceInSek: Math.round(seatPrice[3] * ticketPrice[2] * 100),
            name: 'Senior Quiet',
          },
        ],
        [
          13,
          {
            priceInSek: Math.round(seatPrice[0] * ticketPrice[3] * 100),
            name: 'Child First Class',
          },
        ],
        [
          14,
          {
            priceInSek: Math.round(seatPrice[1] * ticketPrice[3] * 100),
            name: 'Child Second Class',
          },
        ],
        [
          15,
          {
            priceInSek: Math.round(seatPrice[2] * ticketPrice[3] * 100),
            name: 'Child Animal',
          },
        ],
        [
          16,
          {
            priceInSek: Math.round(seatPrice[3] * ticketPrice[3] * 100),
            name: 'Child Quiet',
          },
        ],
      ]);

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card', 'klarna'],
        mode: 'payment',
        line_items: body.items.map((item) => {
          const storeItem = storeItems.get(item.id);
          return {
            price_data: {
              currency: 'sek',
              product_data: {
                name: storeItem.name,
              },
              unit_amount: storeItem.priceInSek,
            },
            quantity: item.quantity,
          };
        }),
        success_url: process.env.CLIENT_URL + '/success',
        cancel_url: process.env.CLIENT_URL + '/canceled',
      });
      return {
        response: 'Payment was succsessfull',
        data: { url: session.url },
      };
    } catch (error) {
      return {
        response: 'Payment was succsessfull',
        data: error,
      };
    }
  }
}

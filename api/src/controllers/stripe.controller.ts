import { Controller, Get, Param } from '@nestjs/common';
import Stripe from 'stripe';
import { getRepository } from 'typeorm';
import { BookingEntity } from '../entities/booking.entity';
import { BookingService } from '../services/booking.service';

@Controller('payment')
export class StripeController {
  constructor(private readonly _bookingService: BookingService) {}
  private readonly stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: '2020-08-27',
  });

  @Get(':sessionId')
  async getCheckoutDetails(@Param('sessionId') sessionId: string) {
    const session = await this.stripe.checkout.sessions.retrieve(sessionId);
    if (session == null) {
      return {
        response: 'Session details could not be fetched.',
        error: 'Session ID is invalid.',
      };
    }

    const metadataObj = JSON.parse(session?.metadata?.body);
    const outboundBooking = await getRepository(BookingEntity)
      .createQueryBuilder('booking')
      .where('booking.id = :id', { id: metadataObj.outboundBookingId })
      .leftJoinAndSelect('booking.customer', 'customer')
      .getOne();

    const outboundReceipt = await this._bookingService.getBookedReceipt({
      bookingId: outboundBooking.id,
      email: outboundBooking.customer.email,
    });

    let returnReceipt = null;
    if (metadataObj.returnBookingId != null) {
      const returnBooking = await getRepository(BookingEntity)
        .createQueryBuilder('booking')
        .where('booking.id = :id', { id: metadataObj.returnBookingId })
        .leftJoinAndSelect('booking.customer', 'customer')
        .getOne();

      returnReceipt = await this._bookingService.getBookedReceipt({
        bookingId: returnBooking.id,
        email: returnBooking.customer.email,
      });
    }

    return {
      response: 'Checkout details successfully fetched.',
      data: { outboundTrip: outboundReceipt, returnTrip: returnReceipt }, //, returnTrip: returnTrip },
    };
  }
}

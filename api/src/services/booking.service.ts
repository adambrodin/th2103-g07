import { Injectable } from '@nestjs/common';
import { BookTripDto } from '@shared/dtos/book-trip.dto';
import { ReceiptEntity } from '../entities/receipt.entity';
import { StationService } from './station.service';
import { TripService } from './trip.service';
import { Trip } from '@shared/models/trip';
import { TripPoint } from '../../../shared/models/trip-point';
import { getRepository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { Customer } from '../../../shared/models/customer';
import { TrainStopEntity } from '../entities/train-stop.entity';
import { BookingEntity } from '../entities/booking.entity';
import { TicketEntity } from '../entities/ticket.entity';
import { TrainEntity } from '../entities/train.entity';

@Injectable()
export class BookingService {
  constructor(
    private readonly _stationService: StationService,
    private readonly _tripService: TripService,
  ) {}

  async getAvailableTrips(
    body: TripPoint[],
  ): Promise<{ error?: string; trips?: Trip[] }> {
    const signatures: string[] = [];

    // Verify that locations are valid TrainStops
    for (const location of [body[0].location, body[1].location]) {
      const fetchedSignature = await this._stationService.getLocationSignature(
        location,
      );

      if (fetchedSignature == null) {
        return { error: `Location '${location}' could not be found.` };
      }

      signatures.push(fetchedSignature);
    }

    const fetchedTrips = await this._tripService.getAvailableTrips(
      body,
      signatures,
    );

    if (fetchedTrips.length <= 0) {
      return { error: 'No available trips were found.' };
    }

    return { trips: fetchedTrips };
  }

  async bookTrip(
    body: BookTripDto,
  ): Promise<{ error?: string; receipt?: ReceiptEntity }> {
    try {
      const receiptRepo = getRepository(ReceiptEntity);
      const ticketRepo = getRepository(TicketEntity);
      const stopRepo = getRepository(TrainStopEntity);
      const bookingRepo = getRepository(BookingEntity);
      const customer = await this.fetchCustomer(body.customer);

      const bookingStops: TrainStopEntity[] = [];
      for (const stopId of body.trainStops) {
        const bookingStop = await stopRepo.findOne({ where: { id: stopId } });
        if (bookingStop == null) {
          return { error: `TrainStop with id '${stopId}' could not be found.` };
        }

        bookingStops.push(bookingStop);
      }

      const train = await getRepository(TrainEntity)
        .createQueryBuilder('train')
        .leftJoinAndSelect('train.stops', 'stop')
        .where('stop.id = :id', { id: bookingStops[0].id })
        .getOne();

      const booking = await bookingRepo.save({ customer: customer });
      for (const seat of body.seats) {
        await ticketRepo.save({
          booking: booking,
          stops: bookingStops,
          train: train,
          type: seat.ticket,
        });
      }

      const savedReceipt = await receiptRepo.save({
        booking: booking,
        totalPrice: 100,
      });

      const receipt = await receiptRepo
        .createQueryBuilder('receipt')
        .where('receipt.id = :id', { id: savedReceipt.id })
        .leftJoinAndSelect('receipt.booking', 'booking')
        .leftJoinAndSelect('booking.tickets', 'ticket')
        .leftJoinAndSelect('ticket.stops', 'stop')
        .orderBy('stop.date')
        .leftJoinAndSelect('stop.train', 'train')
        .getOne();

      return { receipt: receipt };
    } catch (err: any) {
      return { error: err.message };
    }
  }

  async fetchCustomer(customerDetails: Customer): Promise<CustomerEntity> {
    const customerRepo = getRepository(CustomerEntity);
    let customer = await customerRepo.findOne({
      where: {
        email: customerDetails.email,
        phoneNumber: customerDetails.phoneNumber,
      },
    });

    if (customer == null) {
      customer = await customerRepo.save({
        firstName: customerDetails.firstName,
        lastName: customerDetails.lastName,
        phoneNumber: customerDetails.phoneNumber,
        email: customerDetails.email,
      });
    }

    return customer;
  }
}

import { Injectable } from '@nestjs/common';
import { ReceiptEntity } from '../entities/receipt.entity';
import { TripService } from './trip.service';
import { TripResponse } from '@shared/models/trip-response';
import { getRepository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { Customer } from '@shared/models/customer';
import { TrainStopEntity } from '../entities/train-stop.entity';
import { BookingEntity } from '../entities/booking.entity';
import { TicketEntity } from '../entities/ticket.entity';
import { BookingDto } from '@shared/dtos/booking.dto';
import { PriceService } from './price.service';
import { TripSearchDto } from '@shared/dtos/requests/trip-search-request.dto';
import { ReceiptResponseDto } from '@shared/dtos/responses/receipt-response.dto';
import { Seat } from '@shared/models/seat';
import { BookTripRequestDto } from '@shared/dtos/requests/book-trip-request.dto';

@Injectable()
export class BookingService {
  constructor(
    private readonly _tripService: TripService,
    private readonly _priceService: PriceService,
  ) {}

  async getAvailableTrips(
    body: TripSearchDto,
  ): Promise<{ error?: string; trips?: TripResponse[] }> {
    const fetchedTrips = await this._tripService.getAvailableTrips(body);

    if (fetchedTrips?.error != null) {
      return { error: fetchedTrips?.error };
    } else if (fetchedTrips.trips.length <= 0) {
      return { error: 'No available trips were found.' };
    }

    return { trips: fetchedTrips.trips };
  }

  async bookTrip(
    body: BookTripRequestDto,
  ): Promise<{ error?: string; receipt?: ReceiptEntity }> {
    try {
      const receiptRepo = getRepository(ReceiptEntity);
      const ticketRepo = getRepository(TicketEntity);
      const stopRepo = getRepository(TrainStopEntity);
      const bookingRepo = getRepository(BookingEntity);

      const customer = await this.fetchCustomer(body.customer);
      const bookingStops: TrainStopEntity[] = [];
      for (const stopId of body.trainStops) {
        const bookingStop = await stopRepo
          .createQueryBuilder('stop')
          .where('stop.id = :id', { id: stopId })
          .leftJoinAndSelect('stop.train', 'train')
          .leftJoinAndSelect('stop.tickets', 'tickets')
          .leftJoinAndSelect('stop.fromStation', 'fromStation')
          .leftJoinAndSelect('stop.toStation', 'toStation')
          .getOne();
        if (bookingStop == null) {
          return { error: `TrainStop with id '${stopId}' could not be found.` };
        }

        bookingStops.push(bookingStop);
      }

      const remainingSeats = this._tripService.getRemainingSeats(bookingStops);
      if (body.seats.length > remainingSeats) {
        return {
          error: `The passenger capacity of the trip is exceeded. Remaining seats are: ${remainingSeats}.`,
        };
      }

      // Sort the stops in ASCENDING date order
      bookingStops.sort((a, b) => a.date.getTime() - b.date.getTime());
      const booking = await bookingRepo.save({
        customer: customer,
        departure: bookingStops[0],
        arrival: bookingStops[bookingStops.length - 1],
      });
      const tickets: TicketEntity[] = [];
      for (const seat of body.seats) {
        const ticket = ticketRepo.create({
          seatType: seat.seatType,
          booking: booking,
          stops: bookingStops,
          type: seat.ticketType,
          firstName: seat.firstName,
          lastName: seat.lastName,
        });

        const ticketPrice = await this._priceService.getTicketPrice(
          seat.ticketType,
          ticket.seatType,
        );
        ticket.price = ticketPrice;

        await ticketRepo.save(ticket);
        tickets.push(ticket);
      }

      let receiptTotalPrice = 0;
      for (const ticket of tickets) {
        receiptTotalPrice += ticket.price;
      }

      const savedReceipt = await receiptRepo.save({
        booking: booking,
        totalPrice: receiptTotalPrice,
      });

      const receipt = await receiptRepo
        .createQueryBuilder('receipt')
        .where('receipt.id = :id', { id: savedReceipt.id })
        .leftJoinAndSelect('receipt.booking', 'booking')
        .leftJoinAndSelect('booking.departure', 'departure')
        .leftJoinAndSelect('departure.currentStation', 'fromStation')
        .leftJoinAndSelect('booking.arrival', 'arrival')
        .leftJoinAndSelect('arrival.currentStation', 'toStation')
        .leftJoinAndSelect('booking.tickets', 'ticket')
        .leftJoinAndSelect('booking.customer', 'customer')
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

  async getBookedReceipt(
    body: BookingDto,
  ): Promise<{ error?: string; receipt?: ReceiptEntity }> {
    const bookedTrip = await this.getExistingBooking(body);
    if (bookedTrip == null) {
      return {
        error: `Booking with id '${body.bookingId}' belonging to '${body.email}' could not be found.`,
      };
    }

    return { receipt: bookedTrip };
  }

  async cancelBooking(
    body: BookingDto,
  ): Promise<{ error?: string; receipt?: ReceiptEntity }> {
    const bookedTrip = await this.getExistingBooking(body);

    if (bookedTrip == null) {
      return {
        error: `Boooking with id '${body.bookingId}' belonging to '${body.email}' could not be found.`,
      };
    }

    await getRepository(BookingEntity).remove(bookedTrip.booking);
    return { receipt: bookedTrip };
  }

  async createFormattedReceipt(
    body: ReceiptEntity,
  ): Promise<ReceiptResponseDto> {
    const departure = body.booking.departure;
    const arrival = body.booking.arrival;
    const receiptSeats: Seat[] = [];

    for (const ticket of body.booking.tickets) {
      receiptSeats.push({
        firstName: ticket.firstName,
        lastName: ticket.lastName,
        seatType: ticket.seatType,
        ticketType: ticket.type,
        price: ticket.price,
      });
    }

    const receipt: ReceiptResponseDto = {
      totalPrice: body.totalPrice,
      date: body.date,
      booking: {
        id: body.booking.id,
        departure: {
          activityType: departure.activityType,
          tripPoint: {
            location: departure.currentStation.locationName,
            time: departure.date,
          },
        },
        arrival: {
          activityType: arrival.activityType,
          tripPoint: {
            location: arrival.currentStation.locationName,
            time: arrival.date,
          },
        },
      },
      seats: receiptSeats,
    };

    return receipt;
  }

  async getExistingBooking(body: BookingDto): Promise<ReceiptEntity> {
    return await getRepository(ReceiptEntity)
      .createQueryBuilder('receipt')
      .leftJoinAndSelect('receipt.booking', 'booking')
      .where('booking.id = :id', { id: body.bookingId })
      .leftJoin('booking.customer', 'customer')
      .andWhere('customer.email = :email', { email: body.email })
      .leftJoinAndSelect('booking.departure', 'departure')
      .leftJoinAndSelect('departure.currentStation', 'fromStation')
      .leftJoinAndSelect('booking.arrival', 'arrival')
      .leftJoinAndSelect('arrival.currentStation', 'toStation')
      .leftJoinAndSelect('booking.tickets', 'ticket')
      .getOne();
  }
}

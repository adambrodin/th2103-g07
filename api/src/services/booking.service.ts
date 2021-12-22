import { Injectable } from '@nestjs/common';
import { BookTripDto } from '@shared/dtos/book-trip.dto';
import { TripSearchDto } from '@shared/dtos/trip-search.dto';
import { ReceiptEntity } from '../entities/receipt.entity';
import { StationService } from './station.service';
import { TripService } from './trip.service';
import { Trip } from '@shared/models/trip';
import { TripPoint } from '../../../shared/models/trip-point';

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
    } catch (err: any) {
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

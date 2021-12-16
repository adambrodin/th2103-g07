import { Injectable } from '@nestjs/common';
import { Trip } from '@shared/models/trip';
import { BookTripDto } from '@shared/dtos/book-trip.dto';
import { TripSearchDto } from '@shared/dtos/trip-search.dto';
import { ReceiptEntity } from '../entities/receipt.entity';
import { TrainDataService } from './train-data.service';

@Injectable()
export class BookingService {
  constructor(private readonly _trainDataService: TrainDataService) {}

  async getAvailableTrips(
    body: TripSearchDto,
  ): Promise<{ error?: string; trips?: any }> {
    const signatures: string[] = [];

    // Verify that locations are valid TrainStops
    for (const location of [body.departure.location, body.arrival.location]) {
      const fetchedSignature =
        await this._trainDataService.getLocationSignature(location);
      if (fetchedSignature == null) {
        return { error: `Location '${location}' could not be found.` };
      }

      signatures.push(fetchedSignature);
    }

    const fetchedTrips = await this._trainDataService.getAvailableTrips(
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
      return { error: err.detailed };
    }
  }
}

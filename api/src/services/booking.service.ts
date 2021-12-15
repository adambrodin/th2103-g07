import { Injectable } from '@nestjs/common';
import { Trip } from '@shared/models/trip';
import { BookTripDto } from '@shared/dtos/book-trip.dto';
import { TripSearchDto } from '@shared/dtos/trip-search.dto';
import { ReceiptEntity } from '../entities/receipt.entity';

@Injectable()
export class BookingService {
  async getAvailableTrips(body: TripSearchDto): Promise<Trip[]> {
    return [];
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

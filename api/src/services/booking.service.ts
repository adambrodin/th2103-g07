import { Injectable } from '@nestjs/common';
import { Trip } from '@shared/models/trip';
import { TripSearchDto } from '../../../shared/dtos/trip-search.dto';

@Injectable()
export class BookingService {
  async getAvailableTrips(body: TripSearchDto): Promise<Trip[]> {
    return [];
  }
}

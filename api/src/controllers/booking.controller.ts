import { Body, Controller, Post } from '@nestjs/common';
import { BookingService } from '../services/booking.service';
import { TripSearchDto } from '@shared/dtos/trip-search.dto';
import { Trip } from '../../../shared/models/trip';

@Controller('booking')
export class BookingController {
  constructor(private readonly _bookingService: BookingService) {}

  @Post('search')
  async searchAvailableTrips(
    @Body() body: TripSearchDto,
  ): Promise<{ response: string; data?: Trip[] }> {
    const trips = await this._bookingService.getAvailableTrips(body);

    if (trips.length > 0) {
      return { response: 'Trips have been fetched successfully.', data: trips };
    } else {
      return { response: 'No trips were found for the given criteria.' };
    }
  }
}

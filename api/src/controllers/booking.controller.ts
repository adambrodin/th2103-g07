import { Controller } from '@nestjs/common';
import { BookingService } from '../services/booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly _bookingService: BookingService) {}
}

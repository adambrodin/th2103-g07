import { Seat } from "../../models/seat";
import { TripPoint } from "../../models/trip-point";
export class BookingAction {
  activityType: string;
  tripPoint: TripPoint;
}

export class BookingResponseDto {
  id: string;
  departure: BookingAction;
  arrival: BookingAction;
}

export class ReceiptResponseDto {
  date: Date;
  totalPrice: number;
  booking: BookingResponseDto;
  seats: Seat[];
}

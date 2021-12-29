import { TripPoint } from "../../models/trip-point";
import { TripResponse } from "../../models/trip-response";

export class BookingResultDto {
  // Trip data including what switches to make and what trains to travel with
  trips: TripResponse[];

  departure: TripPoint;
  arrival: TripPoint;
  totalPrice: number;
}

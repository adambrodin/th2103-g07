import { TripPoint } from "../models/trip-point";
import { Trip } from "../models/trip";

export class BookingResultDto {
  // Trip data including what switches to make and what trains to travel with
  trips: Trip[];

  departure: TripPoint;
  arrival: TripPoint;
  totalPrice: number;
}

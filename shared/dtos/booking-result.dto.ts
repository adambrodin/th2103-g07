import { TrainDestination } from "../models/train-destination";
import { Trip } from "../models/trip";

export class BookingResultDto {
  // Trip data including what switches to make and what trains to travel with
  trips: Trip[];

  departure: TrainDestination;
  arrival: TrainDestination;
  totalPrice: number;
}

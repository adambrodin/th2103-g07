import { SeatType } from "../enums/seat-type.enum";
import { Train } from "./train";
import { TripPoint } from "./trip-point";

export class PriceResult {
  type: SeatType;
  price: number;
}

export class TripResponse {
  train: Train;
  departure: TripPoint;
  arrival: TripPoint;
  stops: TripPoint[];

  estimatedPrices: PriceResult[];
}

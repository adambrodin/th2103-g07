import { Train } from "./train";
import { TripPoint } from "./trip-point";

export class Trip {
  train: Train;
  departure: TripPoint;
  arrival: TripPoint;
}

import { Train } from "./train";
import { TrainDestination } from "./train-destination";

export class Trip {
  train: Train;
  departure: TrainDestination;
  arrival: TrainDestination;
}

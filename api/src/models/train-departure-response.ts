import { TrainLocation } from './train-timetable-response';

export class TrainDepartureResponse {
  AdvertisedTrainIdent?: string;
  AdvertisedTimeAtLocation?: Date;

  // Returns basic train data, mostly name, e.g 'SJ Snabbtåg'
  ProductInformation?: string[];

  TrackAtLocation?: string;

  ViaToLocation?: TrainLocation[];
}

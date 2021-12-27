export class TrainLocation {
  LocationName?: string;
  Priority?: number;
  Order?: number;
}

export class TrainTimetableResponse {
  ActivityType?: string;
  AdvertisedTimeAtLocation?: Date;
  AdvertisedTrainIdent?: string;
  FromLocation?: TrainLocation[];
  ToLocation?: TrainLocation[];

  // Returns basic train data, mostly name, e.g 'SJ Snabbtåg'
  ProductInformation?: string[];

  LocationSignature?: string;
}

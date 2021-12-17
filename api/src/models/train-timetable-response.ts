export class TrainLocation {
  LocationName?: string;
  Priority?: number;
  Order?: number;
}

export class TrainTimetableResponse {
  AdvertisedTimeAtLocation?: Date;

  // Currently location signature, e.g 'G' for Göteborg
  LocationSignature?: string;

  // Returns basic train data, mostly name, e.g 'SJ Snabbtåg'
  ProductInformation?: string[];
}

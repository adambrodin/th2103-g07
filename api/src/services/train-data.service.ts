import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { getRepository } from 'typeorm';
import { TripSearchDto } from '../../../shared/dtos/trip-search.dto';
import { Trip } from '../../../shared/models/trip';
import { TripPoint } from '../../../shared/models/trip-point';
import { TrainStopEntity } from '../entities/train-stop.entity';
import { TrainDepartureResponse } from '../models/train-departure-response';
import { TrainTimetableResponse } from '../models/train-timetable-response';

@Injectable()
export class TrainDataService {
  trafikverketApiV1 = 'https://api.trafikinfo.trafikverket.se/v1/data.json';
  amountOfTripResults = 10; // Amount of trips to return from a single search

  constructor(private readonly _httpService: HttpService) {}

  async getLocationSignature(locationName: string): Promise<string> {
    const fetchedStop = await getRepository(TrainStopEntity).findOne({
      where: { locationName: locationName },
    });

    if (fetchedStop != null) {
      return fetchedStop.locationSignature;
    }
    return null;
  }

  async getDeparturesFromStation(
    fromSignature: string,
    toSignature: string,
    date: Date,
  ) {
    const requestQuery = `<REQUEST>
	<LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
	<QUERY objecttype="TrainAnnouncement" schemaversion="1.3" orderby="AdvertisedTimeAtLocation">
		<FILTER>
			<AND>
				<EQ name="ActivityType" value="Avgang" />
				<EQ name="LocationSignature" value="${fromSignature}" />
				<EQ name="ToLocation.LocationName" value="${toSignature}"/>
				<AND>
					<GTE name="AdvertisedTimeAtLocation" value="${date}" />
				</AND>
			</AND>
		</FILTER>
		<INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
		<INCLUDE>AdvertisedTrainIdent</INCLUDE>
		<INCLUDE>ProductInformation</INCLUDE>
		<INCLUDE>TrackAtLocation</INCLUDE>
	</QUERY>
</REQUEST>`;

    const response = await firstValueFrom(
      this._httpService.post(this.trafikverketApiV1, requestQuery, {
        headers: { 'Content-Type': 'text/xml' },
      }),
    );

    // Parse response into typed object array
    const parsedDepartures: TrainDepartureResponse[] = JSON.parse(
      JSON.stringify(response.data.RESPONSE.RESULT[0]['TrainAnnouncement']),
    );

    return parsedDepartures;
  }

  async getAvailableTrips(body: TripSearchDto, signatures: string[]) {
    const trips = [];
    const departures = await this.getDeparturesFromStation(
      signatures[0],
      signatures[1],
      body.departure.time,
    );

    for (const departure of departures) {
      const requestQuery = `<REQUEST>
      <LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
      <QUERY objecttype="TrainAnnouncement" schemaversion="1.3">
          <FILTER>
              <EQ name="AdvertisedTrainIdent" value="${
                departure.AdvertisedTrainIdent
              }" />
              <GT name="AdvertisedTimeAtLocation" value="${
                departure.AdvertisedTimeAtLocation
              }" />
              <EQ name="ViaToLocation.LocationName" value="${
                departure.ViaToLocation == null
                  ? ''
                  : departure.ViaToLocation[0].LocationName
              }"/>
              <EQ name="ToLocation.LocationName" value="${signatures[1]}"/>
              <EQ name="FromLocation.LocationName" value="${signatures[0]}"/>
              <EQ name="ActivityType" value="Ankomst"/>
          </FILTER>
          <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
          <INCLUDE>ProductInformation</INCLUDE>
          <INCLUDE>LocationSignature</INCLUDE>
      </QUERY>
  </REQUEST>`;

      const response = await firstValueFrom(
        this._httpService.post(this.trafikverketApiV1, requestQuery, {
          headers: { 'Content-Type': 'text/xml' },
        }),
      );

      const parsedStops: TrainTimetableResponse[] = JSON.parse(
        JSON.stringify(response.data.RESPONSE.RESULT[0]['TrainAnnouncement']),
      );

      const trip = new Trip();
      trip.train = {
        id: departure.AdvertisedTrainIdent,
        name:
          departure.ProductInformation == null
            ? ''
            : departure.ProductInformation[0],
      };

      trip.departure = {
        location: body.departure.location,
        time: departure.AdvertisedTimeAtLocation,
      };

      trip.arrival = {
        location: body.arrival.location,
        time: parsedStops[parsedStops.length - 1].AdvertisedTimeAtLocation,
      };

      // Set the stops to converetd version (with name instead of signature)
      trip.stops = await this.getTrainStopNames(parsedStops, signatures[1]);

      trips.push(trip);

      if (trips.length >= this.amountOfTripResults) {
        break;
      }
    }

    return trips;
  }

  async getTrainStopNames(
    stops: TrainTimetableResponse[],
    endStationSignature: string,
  ): Promise<TripPoint[]> {
    // Convert stop signatures to actual names
    const parsedStops: TripPoint[] = [];

    for (const stop of stops) {
      // Only fetch relevant stops
      if (stop.LocationSignature == endStationSignature) {
        break;
      }

      const fetchedStop = await getRepository(TrainStopEntity).findOne({
        where: { locationSignature: stop.LocationSignature },
      });

      if (fetchedStop != null) {
        const parsedStop = new TripPoint();
        parsedStop.location = fetchedStop.locationName;
        parsedStop.time = stop.AdvertisedTimeAtLocation;
        parsedStops.push(parsedStop);
      }
    }

    return parsedStops;
  }
}

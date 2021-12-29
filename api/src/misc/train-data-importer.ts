import { HttpService } from '@nestjs/axios';
import { env } from 'process';
import { firstValueFrom } from 'rxjs';
import { getRepository } from 'typeorm';
import { SeatType } from '@shared/enums/seat-type.enum';
import { TicketType } from '@shared/enums/ticket-type.enum';
import { SeatPriceEntity } from '../entities/seat-price.entity';
import { TicketPriceEntity } from '../entities/ticket-price.entity';
import { TrainStationEntity } from '../entities/train-station.entity';
import { TrainStopEntity } from '../entities/train-stop.entity';
import { TrainEntity } from '../entities/train.entity';
import { TrafikverketService } from '../services/trafikverket.service';

export class TrainDataImporter {
  seatPrices: { [key: string]: number } = {
    FIRST_CLASS: 1000,
    SECOND_CLASS: 500,
    ANIMAL_CART: 750,
    QUIET_CART: 650,
  };

  // Multipliers for seatPrices ^, e.g First Class with Senior = 1000 * 0.6 = 600
  ticketPrices: { [key: string]: number } = {
    ADULT: 1.0,
    STUDENT: 0.7,
    SENIOR: 0.6,
    CHILD: 0.3,
  };

  constructor(private readonly _httpService: HttpService) {}

  apiUrlV1 = 'https://api.trafikinfo.trafikverket.se/v1/data.json';

  async importStationData() {
    console.log('Importing station data..');

    const getStationsQuery = `<REQUEST>
    <LOGIN authenticationkey="${env.TRAFIKVERKET_API_KEY}" />
    <QUERY objecttype="TrainStation" schemaversion="1">
          <FILTER>
                <AND>
                      <EQ name="Advertised" value="true" />¨
                      <EQ name="CountryCode" value="SE" />
                </AND>
          </FILTER>
          <INCLUDE>AdvertisedLocationName</INCLUDE>
          <INCLUDE>LocationSignature</INCLUDE>
          <INCLUDE>Geometry.WGS84</INCLUDE>
    </QUERY>
</REQUEST>`;

    const res = await firstValueFrom(
      this._httpService.post(this.apiUrlV1, getStationsQuery, {
        headers: { 'Content-Type': 'text/xml' },
      }),
    );

    const stationsArray = Object.values(
      res.data.RESPONSE.RESULT[0]['TrainStation'],
    );

    let stationsAdded = 0;
    for (const station of stationsArray) {
      await getRepository(TrainStationEntity).save({
        locationName: station['AdvertisedLocationName'],
        locationSignature: station['LocationSignature'],
        wgs84Position: station['Geometry'].WGS84,
      });
      stationsAdded++;
    }

    console.log(`Successfully saved ${stationsAdded} stations to database.`);
  }

  async importTrips() {
    console.log('Importing trips..');

    const _trafikverketService = new TrafikverketService(this._httpService);
    const availableStations = await getRepository(TrainStationEntity).find();

    for (const station of availableStations) {
      console.log('At station:', station.locationName);

      const timetable = await _trafikverketService.fetchFutureTimetable(
        station.locationSignature,
      );

      const trainRepo = getRepository(TrainEntity);
      const stopRepo = getRepository(TrainStopEntity);
      const stationRepo = getRepository(TrainStationEntity);

      for (const action of timetable) {
        let train = await trainRepo.findOne({
          where: { trainId: action.AdvertisedTrainIdent },
        });

        if (train == null) {
          train = await trainRepo.save({
            trainId: action.AdvertisedTrainIdent,
            name:
              action.ProductInformation == null
                ? ''
                : action.ProductInformation[0],
          });
        }

        const stop = stopRepo.create();
        stop.activityType = action.ActivityType;
        stop.date = action.AdvertisedTimeAtLocation;

        stop.currentStation = await stationRepo.findOne({
          where: { locationSignature: action.LocationSignature },
        });

        if (action.ToLocation != null && action.FromLocation != null) {
          stop.toStation = await stationRepo.findOne({
            where: {
              locationSignature: action.ToLocation[0].LocationName,
            },
          });

          stop.fromStation = await stationRepo.findOne({
            where: {
              locationSignature: action.FromLocation[0].LocationName,
            },
          });

          stop.train = train;
          await stopRepo.save(stop);
        }
      }
    }

    const availableStops = await getRepository(TrainStopEntity).count();
    console.log(`Successfully saved ${availableStops} stops to database.`);
  }

  async importPrices() {
    const seatPriceRepo = getRepository(SeatPriceEntity);
    const ticketPriceRepo = getRepository(TicketPriceEntity);

    for (const [key, value] of Object.entries(this.seatPrices)) {
      const savedPrice = await seatPriceRepo.save({
        seatType: SeatType[key],
        price: value,
      });
      console.log('Saved seat price: ', savedPrice);
    }

    for (const [key, value] of Object.entries(this.ticketPrices)) {
      const savedPrice = await ticketPriceRepo.save({
        ticketType: TicketType[key],
        priceMultiplier: value,
      });
      console.log('Saved ticket multiplier: ', savedPrice);
    }
  }

  async importTrainData() {
    const trainStations = await getRepository(TrainStationEntity).count();
    // Import data about stations (name, position, locationSignature etc)
    if (trainStations <= 0) {
      await this.importStationData();
    }

    const trainStops = await getRepository(TrainStopEntity).count();

    // Import data about train trips (arrivals/departures etc)
    if (trainStops <= 0) {
      await this.importTrips();
    }

    const seatPrices = await getRepository(SeatPriceEntity).count();
    const ticketPrices = await getRepository(TicketPriceEntity).count();
    if (seatPrices <= 0 || ticketPrices <= 0) {
      await this.importPrices();
    }
  }
}

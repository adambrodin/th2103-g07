import { HttpService } from '@nestjs/axios';
import { env } from 'process';
import { firstValueFrom } from 'rxjs';
import { getRepository } from 'typeorm';
import { TrainStopEntity } from '../entities/train-stop.entity';
export class TrainDataImporter {
  apiUrl = 'https://api.trafikinfo.trafikverket.se/v1/data.json';
  constructor() {}

  _httpService = new HttpService();
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

    const _httpService = new HttpService();
    firstValueFrom(
      this._httpService.post(this.apiUrlV1, getStationsQuery, {
        headers: { 'Content-Type': 'text/xml' },
      }),
    ).then(async (res) => {
      const stationsArray = Object.values(
        res.data.RESPONSE.RESULT[0]['TrainStation'],
      );

      let stationsAdded = 0;
      for (const station of stationsArray) {
        const stationEntity = await getRepository(TrainStopEntity).save({
          locationName: station['AdvertisedLocationName'],
          locationSignature: station['LocationSignature'],
          wgs84Position: station['Geometry'].WGS84,
        });
        stationsAdded++;
      }

      console.log(`Successfully saved ${stationsAdded} stations to database.`);
    });
  }

  async importTrainData() {
    // Import data about stations (name, position, locationSignature etc)
    await this.importStationData();
  }
}

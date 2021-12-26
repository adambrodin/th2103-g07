import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { TrainTimetableResponse } from '../models/train-timetable-response';

@Injectable()
export class TrafikverketService {
  trafikverketApiV1 = 'https://api.trafikinfo.trafikverket.se/v1/data.json';
  constructor(private readonly _httpService: HttpService) {}
  async fetchFutureTimetable(
    locationSignature: string,
  ): Promise<TrainTimetableResponse[]> {
    const requestQuery = `<REQUEST>
    <LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
    <QUERY objecttype="TrainAnnouncement" schemaversion="1.3" orderby="AdvertisedTimeAtLocation">
      <FILTER>
        <AND>
          <EQ name="LocationSignature" value="${locationSignature}" />
          <GT name="AdvertisedTimeAtLocation" value="$dateadd(-2000:15:00)" />
          <LT name="AdvertisedTimeAtLocation" value="$dateadd(2000:00:00)" />
        </AND>
      </FILTER>
		<INCLUDE>ActivityType</INCLUDE>
		<INCLUDE>AdvertisedTrainIdent</INCLUDE>
		<INCLUDE>ProductInformation</INCLUDE>
		<INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
		<INCLUDE>FromLocation</INCLUDE>
		<INCLUDE>ToLocation</INCLUDE>
		<INCLUDE>LocationSignature</INCLUDE>
    </QUERY>
  </REQUEST>`;

    const response = await firstValueFrom(
      this._httpService.post(this.trafikverketApiV1, requestQuery, {
        headers: { 'Content-Type': 'text/xml' },
      }),
    );

    // Parse response into typed object array
    const parsedDepartures: TrainTimetableResponse[] = JSON.parse(
      JSON.stringify(response.data.RESPONSE.RESULT[0]['TrainAnnouncement']),
    );

    return parsedDepartures;
  }
}

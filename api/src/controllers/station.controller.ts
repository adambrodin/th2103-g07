import { Controller, Get } from '@nestjs/common';
import { StationService } from 'src/services/station.service';

@Controller('station')
export class StationController {
  constructor(private readonly _stationService: StationService) {}

  @Get()
  async getAllStations() {
    return this._stationService.getStationNames();
  }
}

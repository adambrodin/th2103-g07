import { Injectable } from '@nestjs/common';
import { TrainStationEntity } from 'src/entities/train-station.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class StationService {
  async getStationNames() {
    return await getRepository(TrainStationEntity)
      .createQueryBuilder('station')
      .select('station.locationName')
      .getMany();
  }

  async getLocationSignature(locationName: string): Promise<string> {
    const location = await getRepository(TrainStationEntity).findOne({
      where: { locationName: locationName },
    });

    if (location != null) {
      return location.locationSignature;
    }

    return null;
  }
}

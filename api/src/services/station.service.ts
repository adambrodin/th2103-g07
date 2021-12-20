import { Injectable } from "@nestjs/common";
import { TrainStopEntity } from "src/entities/train-stop.entity";
import { getRepository } from "typeorm";

@Injectable()
export class StationService {
    async getStationNames() {
        return await getRepository(TrainStopEntity).createQueryBuilder('station').select('station.locationName').getMany();
    }
}
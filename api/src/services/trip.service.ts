import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { TripSearchDto } from '@shared/dtos/trip-search.dto';
import { Trip } from '@shared/models/trip';
import { TrainStopEntity } from '../entities/train-stop.entity';
import { TripPoint } from '../../../shared/models/trip-point';

@Injectable()
export class TripService {
  // Maximum amount of trips to retrieve and return in controller
  maxTripsToFetch = 10;

  async getAvailableTrips(body: TripSearchDto, signatures: string[]) {
    const stopRepo = getRepository(TrainStopEntity);

    // Trips where you don't have to switch trains in order to reach the final destination
    const departures = await stopRepo
      .createQueryBuilder('departure')
      .where('departure.date >= :date', { date: body.departure.time })
      .andWhere('departure.activityType = :type', {
        type: 'Avgang',
      })
      .andWhere('departure.currentStation = :currentStation', {
        currentStation: signatures[0],
      })
      .andWhere('departure.fromStation = :fromStation', {
        fromStation: signatures[0],
      })
      .andWhere('departure.toStation = :toStation', {
        toStation: signatures[1],
      })
      .leftJoinAndSelect('departure.currentStation', 'currentStation')
      .leftJoinAndSelect('departure.fromStation', 'fromStation')
      .leftJoinAndSelect('departure.toStation', 'toStation')
      .leftJoinAndSelect('departure.train', 'train')
      .andWhere('departure.fromStation is not null')
      .andWhere('departure.toStation is not null')
      .limit(this.maxTripsToFetch)
      .orderBy('departure.date', 'ASC')
      .getMany();

    const returnTrips: Trip[] = [];
    if (departures.length > 0) {
      for (const departure of departures) {
        const stops = await stopRepo
          .createQueryBuilder('stop')
          .leftJoin('stop.train', 'train')
          .where('train.trainId = :id', { id: departure.train.trainId })
          .andWhere('stop.date > :date', { date: departure.date })
          .andWhere('stop.activityType = :type', { type: 'Ankomst' })
          .leftJoinAndSelect('stop.currentStation', 'currentStation')
          .leftJoinAndSelect('stop.fromStation', 'fromStation')
          .leftJoinAndSelect('stop.toStation', 'toStation')
          .orderBy('stop.date')
          .getMany();

        const trip = new Trip();
        trip.departure = {
          location: departure.fromStation.locationName,
          time: departure.date,
        };

        const tripStops: TripPoint[] = [];
        for (const stop of stops) {
          if (
            stop.currentStation.locationSignature ==
            departure.toStation.locationSignature
          ) {
            trip.arrival = {
              location: stop.currentStation.locationName,
              time: stop.date,
            };
            break;
          }

          tripStops.push({
            location: stop.currentStation.locationName,
            time: stop.date,
          });
        }

        trip.stops = tripStops;
        returnTrips.push(trip);
      }
    } else {
      // Fetch trips with switches
    }

    return returnTrips;
  }
}

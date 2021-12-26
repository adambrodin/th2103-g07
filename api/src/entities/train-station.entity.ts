import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { TrainStopEntity } from './train-stop.entity';

@Entity({ name: 'TrainStation' })
export class TrainStationEntity {
  @PrimaryColumn()
  locationSignature: string;

  @Column()
  locationName: string;

  @Column()
  wgs84Position: string;

  @OneToMany(() => TrainStopEntity, (entity) => entity.currentStation)
  currentStations: TrainStopEntity[];

  @OneToMany(() => TrainStopEntity, (entity) => entity.fromStation)
  fromStations: TrainStopEntity[];

  @OneToMany(() => TrainStopEntity, (entity) => entity.toStation)
  toStations: TrainStopEntity[];
}

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainStationEntity } from './train-station.entity';
import { TrainEntity } from './train.entity';

@Entity('TrainStop')
export class TrainStopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activityType: string;

  @ManyToOne(() => TrainStationEntity)
  @JoinColumn({ name: 'Current_Station' })
  currentStation: TrainStationEntity;

  @ManyToOne(() => TrainStationEntity)
  @JoinColumn({ name: 'From_Station' })
  fromStation: TrainStationEntity;

  @ManyToOne(() => TrainStationEntity)
  @JoinColumn({ name: 'To_Station' })
  toStation: TrainStationEntity;

  @ManyToOne(() => TrainEntity, (entity) => entity.stops)
  train: TrainEntity;

  @Column()
  date: Date;
}

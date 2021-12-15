import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TrainStopEntity } from './train-stop.entity';
import { TrainEntity } from './train.entity';

@Entity({ name: 'Route' })
export class RouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => TrainEntity)
  trains: TrainEntity[];

  @ManyToMany(() => TrainStopEntity)
  @JoinTable({ name: 'Route_Stops' })
  stops: TrainStopEntity[];
}

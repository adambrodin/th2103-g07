import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingEntity } from './booking.entity';
import { TicketEntity } from './ticket.entity';
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

  @ManyToMany(() => TicketEntity, (entity) => entity.stops)
  tickets: TicketEntity[];

  @Column()
  date: Date;

  @OneToMany(() => BookingEntity, (entity) => entity.departure)
  departures: BookingEntity[];

  @OneToMany(() => BookingEntity, (entity) => entity.arrival)
  arrivals: BookingEntity[];
}

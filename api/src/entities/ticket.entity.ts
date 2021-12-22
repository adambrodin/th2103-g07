import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingEntity } from './booking.entity';
import { TicketType } from '@shared/enums/ticket-type.enum';
import { TrainStopEntity } from './train-stop.entity';

@Entity({ name: 'Ticket' })
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 100 })
  price: number;

  @Column({ type: 'enum', enum: TicketType, default: TicketType.ADULT })
  type: TicketType;

  @ManyToMany(() => TrainStopEntity, (entity) => entity.tickets)
  @JoinTable({ name: 'Ticket_Stops' })
  stops: TrainStopEntity[];

  @ManyToOne(() => BookingEntity, (entity) => entity.tickets)
  booking: BookingEntity;
}

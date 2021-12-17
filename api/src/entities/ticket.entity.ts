import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookingEntity } from './booking.entity';
import { TrainEntity } from './train.entity';
import { TicketType } from '@shared/enums/ticket-type.enum';

@Entity({ name: 'Ticket' })
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ type: 'enum', enum: TicketType, default: TicketType.ADULT })
  type: TicketType;

  @ManyToMany(() => TrainEntity, (entity) => entity.tickets)
  @JoinTable({ name: 'Ticket_Trains' })
  train: TrainEntity;

  @ManyToOne(() => BookingEntity, (entity) => entity.tickets)
  booking: BookingEntity;
}

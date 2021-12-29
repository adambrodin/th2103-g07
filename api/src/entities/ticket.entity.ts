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
import { SeatType } from '@shared/enums/seat-type.enum';

@Entity({ name: 'Ticket' })
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ type: 'enum', enum: TicketType, default: TicketType.ADULT })
  type: TicketType;

  @Column({
    type: 'enum',
    enum: SeatType,
  })
  seatType: SeatType;

  @ManyToMany(() => TrainStopEntity, (entity) => entity.tickets)
  @JoinTable({ name: 'Ticket_Stops' })
  stops: TrainStopEntity[];

  @ManyToOne(() => BookingEntity, (entity) => entity.tickets, {
    onDelete: 'CASCADE',
  })
  booking: BookingEntity;

  // Passenger details
  @Column()
  firstName: string;

  @Column()
  lastName: string;
}

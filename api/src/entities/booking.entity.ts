import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { ReceiptEntity } from './receipt.entity';
import { TicketEntity } from './ticket.entity';
import { TrainStopEntity } from './train-stop.entity';

@Entity({ name: 'Booking' })
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TrainStopEntity, (entity) => entity.departures)
  departure: TrainStopEntity;

  @ManyToOne(() => TrainStopEntity, (entity) => entity.arrivals)
  arrival: TrainStopEntity;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'Booking_Customer' })
  customer: CustomerEntity;

  @OneToMany(() => TicketEntity, (entity) => entity.booking)
  @JoinColumn({ name: 'Booking_Tickets' })
  tickets: TicketEntity[];

  @OneToOne(() => ReceiptEntity)
  receipt: ReceiptEntity;
}

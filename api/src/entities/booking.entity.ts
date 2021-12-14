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

@Entity({ name: 'Booking' })
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CustomerEntity)
  @JoinColumn({ name: 'Booking_Customers' })
  customer: CustomerEntity;

  @OneToMany(() => TicketEntity, (entity) => entity.booking)
  @JoinColumn({ name: 'Booking_Tickets' })
  tickets: TicketEntity[];

  @OneToOne(() => ReceiptEntity)
  @JoinColumn({ name: 'Booking_Receipts' })
  receipt: ReceiptEntity;
}

import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookingEntity } from './booking.entity';

@Entity({ name: 'Receipt' })
export class ReceiptEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  date: Date;

  @Column()
  totalPrice: number;

  @OneToOne(() => BookingEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Receipt_Booking' })
  booking: BookingEntity;
}

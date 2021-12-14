import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookingEntity } from './booking.entity';

@Entity({ name: 'Receipt' })
export class ReceiptEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  totalPrice: number;

  @OneToOne(() => BookingEntity)
  booking: BookingEntity;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';
import { SeatType } from '../../../shared/enums/seat-type.enum';
@Entity({ name: 'SeatPrice' })
export class SeatPriceEntity {
  @PrimaryColumn({
    type: 'enum',
    enum: SeatType,
  })
  seatType: SeatType;

  @Column({ type: 'double precision' })
  price: number;
}

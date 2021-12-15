import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TrainEntity } from './train.entity';
import { SeatType } from '@shared/enums/seat-type.enum';

@Entity({ name: 'Seat' })
export class SeatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SeatType, default: SeatType.REGULAR })
  type: SeatType;

  @ManyToOne(() => TrainEntity)
  train: TrainEntity;
}

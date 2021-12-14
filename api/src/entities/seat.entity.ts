import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TrainEntity } from './train.entity';

export enum SeatType {
  REGULAR = 'Regular',
  QUIET = 'Quiet',
  ANIMAL_FRIENDLY = 'Animal Friendly',
}

@Entity({ name: 'Seat' })
export class SeatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: SeatType, default: SeatType.REGULAR })
  type: SeatType;

  @ManyToOne(() => TrainEntity)
  train: TrainEntity;
}

import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { TrainStopEntity } from './train-stop.entity';

@Entity({ name: 'Train' })
export class TrainEntity {
  @PrimaryColumn()
  trainId: string;

  @Column()
  name: string;

  @Column({ default: 40 })
  passengerCapacity: number;

  @OneToMany(() => TrainStopEntity, (entity) => entity.train)
  @JoinColumn({ name: 'Train_Stops' })
  stops: TrainStopEntity[];
}

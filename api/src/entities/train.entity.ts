import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { TrainStopEntity } from './train-stop.entity';

@Entity({ name: 'Train' })
export class TrainEntity {
  @PrimaryColumn()
  trainId: string;

  @Column()
  name: string;

  @OneToMany(() => TrainStopEntity, (entity) => entity.train)
  @JoinColumn({ name: 'Train_Stops' })
  stops: TrainStopEntity[];
}

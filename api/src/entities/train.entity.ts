import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { SeatEntity } from './seat.entity';
import { TicketEntity } from './ticket.entity';
import { TrainStopEntity } from './train-stop.entity';

@Entity({ name: 'Train' })
export class TrainEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  model: string;

  @OneToMany(() => SeatEntity, (entity) => entity.train, { nullable: true })
  @JoinColumn({ name: 'Train_Seats' })
  seats: SeatEntity[];

  @ManyToMany(() => TicketEntity, { nullable: true })
  tickets: TicketEntity[];

  @OneToMany(() => TrainStopEntity, (entity) => entity.train, {
    nullable: true,
  })
  @JoinColumn({ name: 'Train_Stops' })
  stops: TrainStopEntity[];
}

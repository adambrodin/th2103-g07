import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RouteEntity } from './route.entity';
import { SeatEntity } from './seat.entity';
import { TicketEntity } from './ticket.entity';

@Entity({ name: 'Train' })
export class TrainEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @ManyToMany(() => RouteEntity)
  @JoinTable({ name: 'Train_Routes' })
  route: RouteEntity;

  @OneToMany(() => SeatEntity, (entity) => entity.train)
  @JoinColumn({ name: 'Train_Seats' })
  seats: SeatEntity[];

  @ManyToMany(() => TicketEntity)
  tickets: TicketEntity[];
}

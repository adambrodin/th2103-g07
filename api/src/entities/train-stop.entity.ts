import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RouteEntity } from './route.entity';

@Entity({ name: 'TrainStop' })
export class TrainStopEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  longitud: string;

  @Column()
  latitud: string;

  @ManyToMany(() => RouteEntity)
  routes: RouteEntity[];
}

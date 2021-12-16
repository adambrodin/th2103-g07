import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { RouteEntity } from './route.entity';

@Entity({ name: 'TrainStop' })
export class TrainStopEntity {
  @PrimaryColumn()
  locationSignature: string;

  @Column()
  locationName: string;

  @Column()
  wgs84Position: string;

  @ManyToMany(() => RouteEntity)
  routes: RouteEntity[];
}

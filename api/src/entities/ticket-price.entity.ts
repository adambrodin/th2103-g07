import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TicketType } from '@shared/enums/ticket-type.enum';

@Entity({ name: 'TicketPrice' })
export class TicketPriceEntity {
  @PrimaryColumn({ type: 'enum', enum: TicketType })
  ticketType: TicketType;

  @Column({ type: 'double precision' })
  priceMultiplier: number;
}

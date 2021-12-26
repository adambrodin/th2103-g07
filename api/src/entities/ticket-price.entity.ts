import { Column, Entity, PrimaryColumn } from 'typeorm';
import { TicketClassType } from '../../../shared/enums/ticket-class-type.enum';

@Entity({ name: 'TicketPrice' })
export class TicketPriceEntity {
  @PrimaryColumn({
    type: 'enum',
    enum: TicketClassType,
  })
  ticketClass: TicketClassType;

  @Column()
  price: number;
}

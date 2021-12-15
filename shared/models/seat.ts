import { IsEnum } from "class-validator";
import { SeatType } from "../enums/seat-type.enum";
import { TicketType } from "../enums/ticket-type.enum";

export class Seat {
  @IsEnum(SeatType)
  seat: SeatType;

  @IsEnum(TicketType)
  ticket: TicketType;
}

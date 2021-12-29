import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { SeatType } from "../enums/seat-type.enum";
import { TicketType } from "../enums/ticket-type.enum";

export class Seat {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(SeatType)
  seatType: SeatType;

  @IsEnum(TicketType)
  ticketType: TicketType;
}

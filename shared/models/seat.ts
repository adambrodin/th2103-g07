import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
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

  @IsOptional()
  @IsNumber()
  price: number;
}

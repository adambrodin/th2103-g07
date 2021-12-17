import { IsEnum, IsNumber, Min } from "class-validator";
import { TicketType } from "../enums/ticket-type.enum";

export class TicketDto {
  @IsEnum(TicketType)
  type: TicketType;

  @IsNumber()
  @Min(1)
  amount: number;
}

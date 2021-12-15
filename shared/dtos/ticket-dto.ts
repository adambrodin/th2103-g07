import { IsEnum, IsNotEmpty, Min } from "class-validator";
import { TicketType } from "../enums/ticket-type.enum";

export class TicketDto {
  @IsEnum(TicketType)
  type: TicketType;

  @Min(1)
  amount: number;
}

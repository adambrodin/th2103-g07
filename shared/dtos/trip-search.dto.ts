import {
  ArrayNotEmpty,
  IsISO8601,
  IsNotEmpty,
  ValidateNested,
} from "class-validator";
import { TicketDto } from "./ticket-dto";
import { Type } from "class-transformer";

export class TripSearchDto {
  @IsNotEmpty()
  startDestination!: string;

  @IsNotEmpty()
  endDestination!: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];

  @IsISO8601()
  startDate!: Date;

  @IsISO8601()
  endDate!: Date;
}

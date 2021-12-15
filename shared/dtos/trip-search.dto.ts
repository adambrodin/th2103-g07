import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from "class-validator";
import { TicketDto } from "./ticket-dto";
import { Type } from "class-transformer";
import { TripPoint } from "../models/trip-point";

export class TripSearchDto {
  @IsNotEmpty()
  @ValidateNested()
  departure: TripPoint;

  @IsNotEmpty()
  @ValidateNested()
  arrival: TripPoint;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

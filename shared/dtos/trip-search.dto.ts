import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { TicketDto } from "./ticket-dto";
import { Type } from "class-transformer";
import { TripPoint } from "../models/trip-point";

export class TripSearchDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TripPoint)
  departure: TripPoint;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TripPoint)
  arrival: TripPoint;

  @IsOptional()
  @ValidateNested()
  @Type(() => TripPoint)
  ReturnDeparture?: TripPoint;

  @IsOptional()
  @ValidateNested()
  @Type(() => TripPoint)
  ReturnArrival?: TripPoint;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

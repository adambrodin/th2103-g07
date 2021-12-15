import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from "class-validator";
import { TicketDto } from "./ticket-dto";
import { Type } from "class-transformer";
import { TrainDestination } from "../models/train-destination";

export class TripSearchDto {
  @IsNotEmpty()
  @ValidateNested()
  departure: TrainDestination;

  @IsNotEmpty()
  @ValidateNested()
  arrival: TrainDestination;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

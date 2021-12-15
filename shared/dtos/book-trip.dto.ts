import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
} from "class-validator";
import { SeatType } from "../enums/seat-type.enum";
import { Customer } from "../models/customer";
import { Train } from "../models/train";
import { TicketDto } from "./ticket-dto";

export class BookTripDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Customer)
  customer: Customer;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Train)
  train: Train;

  @ArrayNotEmpty()
  @IsEnum(SeatType, { each: true })
  seats: SeatType[];

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}

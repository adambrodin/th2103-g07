import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from "class-validator";
import { Customer } from "../models/customer";
import { Seat } from "../models/seat";

export class BookTripDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => Customer)
  customer: Customer;

  @ArrayNotEmpty()
  trainStops: number[];

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => Seat)
  seats: Seat[];
}

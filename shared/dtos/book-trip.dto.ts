import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from "class-validator";
import { Customer } from "../models/customer";
import { Seat } from "../models/seat";
import { Train } from "../models/train";

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
  @ValidateNested({ each: true })
  @Type(() => Seat)
  seats: Seat[];
}

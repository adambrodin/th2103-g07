import { IsISO8601, IsNotEmpty } from "class-validator";
export class TripPoint {
  @IsNotEmpty()
  location: string;

  @IsISO8601()
  time: Date;
}

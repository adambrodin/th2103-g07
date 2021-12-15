import { IsISO8601, IsNotEmpty, IsString } from "class-validator";
export class TripPoint {
  @IsNotEmpty()
  @IsString()
  location: string;

  @IsISO8601()
  time: Date;
}

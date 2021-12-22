import { IsISO8601, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class TripPoint {
  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  time?: Date;
}

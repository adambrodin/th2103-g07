import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
export class TripPoint {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsOptional()
  time?: Date;
}

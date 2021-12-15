import { IsISO8601, IsNotEmpty } from "class-validator";
export class TrainDestination {
  @IsNotEmpty()
  destination: string;

  @IsISO8601()
  time: Date;
}

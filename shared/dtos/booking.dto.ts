import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";

export class BookingDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsUUID()
  bookingId: string;
}

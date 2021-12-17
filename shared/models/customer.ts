import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class Customer {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber("SE")
  phoneNumber: string;
}

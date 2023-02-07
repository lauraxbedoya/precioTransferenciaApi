import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateUnknownUserDto } from "../user/user.dto";

export class StatementDateRequestDto {

  @IsNotEmpty()
  user: CreateUnknownUserDto

  @IsNumber()
  @IsNotEmpty()
  lastNITDigit: number;
}
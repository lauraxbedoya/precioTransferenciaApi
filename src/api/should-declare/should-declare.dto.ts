import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateUnknownUserDto } from "../user/user.dto";

export class CreateShouldDeclareSubmissionDto {

  @IsNotEmpty()
  nit: string;

  @IsNotEmpty()
  user: CreateUnknownUserDto;

  @IsNotEmpty()
  answers: CreateShouldDeclareSubmissionQuestionAnswersDto[];

}

export class CreateShouldDeclareSubmissionQuestionAnswersDto {

  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  @IsString()
  @IsNotEmpty()
  answer: string;

}
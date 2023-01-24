import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateUserShouldDeclareDto } from "../user/user.dto";

export class CreateShouldDeclareSubmissionDto {

  @IsNotEmpty()
  user: CreateUserShouldDeclareDto;

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
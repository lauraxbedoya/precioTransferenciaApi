import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/services/user.service";
import { ShouldDeclareController } from "./controllers/should-declare.controller";
import { ShouldDeclareAnswer } from "./entities/should-declare-answers.entity";
import { ShouldDeclareQuestionOptions } from "./entities/should-declare-question-options.entity";
import { ShouldDeclareQuestions } from "./entities/should-declare-questions.entity";
import { ShouldDeclareSubmissions } from "./entities/should-declare-submissions.entity";
import { ShouldDeclareService } from "./services/should-declare.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ShouldDeclareAnswer, ShouldDeclareQuestionOptions, ShouldDeclareQuestions, ShouldDeclareSubmissions]),
  ],
  providers: [ShouldDeclareService, UserService],
  controllers: [ShouldDeclareController],
  exports: [ShouldDeclareService]
})
export class ShouldDeclareModule { }

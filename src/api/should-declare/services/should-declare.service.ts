import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserService } from "src/api/user/services/user.service";
import { CreateUserShouldDeclareDto } from "src/api/user/user.dto";
import { UserCreatedFrom } from "src/api/user/user.enum";
import { Repository } from "typeorm";
import { ShouldDeclareAnswers } from "../entities/should-declare-answers.entity";
import { ShouldDeclareSubmissions } from "../entities/should-declare-submissions.entity";
import { CreateShouldDeclareSubmissionQuestionAnswersDto } from "../should-declare.dto";

@Injectable()
export class ShouldDeclareService {
  constructor(
    @InjectRepository(ShouldDeclareSubmissions)
    private submissionRepo: Repository<ShouldDeclareSubmissions>,
    @InjectRepository(ShouldDeclareAnswers)
    private submissionAnswerRepo: Repository<ShouldDeclareAnswers>,

    private userService: UserService,
  ) { }

  async createSubmission(user: CreateUserShouldDeclareDto) {
    let userDB = await this.userService.findByEmail(user.email);
    if (!userDB) {
      userDB = await this.userService.create({ ...user, createdFrom: UserCreatedFrom.ShouldDeclare });
    }
    const newSubmission = new ShouldDeclareSubmissions();
    newSubmission.userId = userDB.id;

    return this.submissionRepo.save(newSubmission);
  }

  async createSubmissionAnswers(submissionId: number, answers: CreateShouldDeclareSubmissionQuestionAnswersDto[]) {
    const submissionAnswer = new ShouldDeclareAnswers();
    for (let i = 0; i < answers.length; i++) {
      submissionAnswer.submissionId = submissionId;
      submissionAnswer.questionId = answers[i].questionId;
      submissionAnswer.answer = answers[i].answer;

      return this.submissionAnswerRepo.save(submissionAnswer);
    }
  }
}
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUnknownUserDto } from "src/api/user/user.dto";
import { MailService } from "src/mail/mail.service";
import { Repository } from "typeorm";
import { ShouldDeclareAnswer } from "../entities/should-declare-answers.entity";
import { ShouldDeclareQuestions } from "../entities/should-declare-questions.entity";
import { ShouldDeclareSubmissions } from "../entities/should-declare-submissions.entity";
import { CreateShouldDeclareSubmissionQuestionAnswersDto } from "../should-declare.dto";

@Injectable()
export class ShouldDeclareService {
  constructor(
    @InjectRepository(ShouldDeclareSubmissions)
    private submissionRepo: Repository<ShouldDeclareSubmissions>,
    @InjectRepository(ShouldDeclareQuestions)
    private questionRepo: Repository<ShouldDeclareQuestions>,
    @InjectRepository(ShouldDeclareAnswer)
    private submissionAnswerRepo: Repository<ShouldDeclareAnswer>,

    private mailService: MailService
  ) { }

  async createSubmission(userId: number): Promise<ShouldDeclareSubmissions> {
    const newSubmission = new ShouldDeclareSubmissions();
    newSubmission.userId = userId;
    return this.submissionRepo.save(newSubmission);
  }

  async createSubmissionAnswers(submissionId: number, answers: CreateShouldDeclareSubmissionQuestionAnswersDto[]) {
    for (let i = 0; i < answers.length; i++) {
      const submissionAnswer = new ShouldDeclareAnswer();
      submissionAnswer.submissionId = submissionId;
      submissionAnswer.questionId = answers[i].questionId;
      submissionAnswer.answer = answers[i].answer;

      this.submissionAnswerRepo.save(submissionAnswer);
    }
  }

  async sendEmailSubmissionAnswer(user: CreateUnknownUserDto, answers: CreateShouldDeclareSubmissionQuestionAnswersDto[]) {
    const questions = await this.findAllShouldDeclareQuestion();

    const questionsAnswers = [];
    for (let i = 0; i < answers.length; i++) {
      const question = questions.find((ques) => ques.id === answers[i].questionId);
      questionsAnswers.push({ question: question.question, answer: answers[i].answer });
    }
    this.mailService.sendUserConfirmation(user, questionsAnswers);
  }

  findAllShouldDeclareQuestion() {
    return this.questionRepo.find();
  }
}
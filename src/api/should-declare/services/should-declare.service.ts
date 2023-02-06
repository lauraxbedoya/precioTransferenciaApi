import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/api/user/entities/user.entity";
import { UserService } from "src/api/user/services/user.service";
import { CreateUserShouldDeclareDto } from "src/api/user/user.dto";
import { UserCreatedFrom } from "src/api/user/user.enum";
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
    @InjectRepository(User)
    private userRepo: Repository<User>,

    private userService: UserService,
    private mailService: MailService
  ) { }

  async createSubmission(user: CreateUserShouldDeclareDto): Promise<ShouldDeclareSubmissions> {
    let userDB = await this.userService.findByEmail(user.email);
    if (!userDB) {
      userDB = await this.userService.create({ ...user, createdFrom: UserCreatedFrom.ShouldDeclare });
    } else {
      if (userDB.name !== user.name || userDB.lastName !== user.lastName) {
        const userUpdate = await this.userService.update(userDB.id, { name: user.name, lastName: user.lastName })
        this.userRepo.save(userUpdate)
      }
    }

    const newSubmission = new ShouldDeclareSubmissions();
    newSubmission.userId = userDB.id;
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

  async sendEmailSubmissionAnswer(user: CreateUserShouldDeclareDto, answers: CreateShouldDeclareSubmissionQuestionAnswersDto[]) {
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
import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserCompanyService } from "src/api/user/services/user-company.service";
import { UserService } from "src/api/user/services/user.service";
import { ShouldDeclareService } from "../services/should-declare.service";
import { CreateShouldDeclareSubmissionDto } from '../should-declare.dto';

@Controller('should-declare')
export class ShouldDeclareController {
  constructor(
    private shouldDeclareService: ShouldDeclareService,
    private userService: UserService,
    private userCompanyService: UserCompanyService,
  ) { }

  @Get()
  findAllShouldDeclareQuestion() {
    return this.shouldDeclareService.findAllShouldDeclareQuestion();
  }

  @Post('create-submission')
  async createSubmission(@Body() body: CreateShouldDeclareSubmissionDto) {
    const user = await this.userService.findUpdateOrCreate(body.user);

    await this.userCompanyService.findUpdateOrCreate(user.id, body.nit);

    const submission = await this.shouldDeclareService.createSubmission(user.id);

    this.shouldDeclareService.sendEmailSubmissionAnswer(body.user, body.answers)

    await this.shouldDeclareService.createSubmissionAnswers(submission.id, body.answers);

    return this.shouldDeclareService.getResult(body.answers);
  }
}
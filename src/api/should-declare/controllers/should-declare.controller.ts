import { Body, Controller, Get, Post } from "@nestjs/common";
import { ShouldDeclareSubmissions } from "../entities/should-declare-submissions.entity";
import { ShouldDeclareService } from "../services/should-declare.service";

@Controller('should-declare')
export class ShouldDeclareController {
  constructor(
    private shouldDeclareService: ShouldDeclareService,
  ) { }

  @Get()
  findAllShouldDeclareQuestion() {
    return this.shouldDeclareService.findAllShouldDeclareQuestion();
  }

  @Post('create-submission')
  async createSubmission(@Body() body: ShouldDeclareSubmissions) {
    const submission = await this.shouldDeclareService.createSubmission(body.userId);

    this.shouldDeclareService.sendEmailSubmissionAnswer(body.user, body.answers)

    await this.shouldDeclareService.createSubmissionAnswers(submission.id, body.answers);
  }
}
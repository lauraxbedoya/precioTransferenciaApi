import { Body, Controller, Get, Post } from "@nestjs/common";
import { ShouldDeclareService } from "../services/should-declare.service";
import { CreateShouldDeclareSubmissionDto } from "../should-declare.dto";

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
  async createSubmission(@Body() body: CreateShouldDeclareSubmissionDto) {
    const submission = await this.shouldDeclareService.createSubmission(body.user);

    await this.shouldDeclareService.createSubmissionAnswers(submission.id, body.answers);
  }
}
import { Body, Controller, Post } from "@nestjs/common";
import { StatementDateRequestDto } from "../statement-date-request.dto";
import { DateDeclareService } from "../services/statement-date-request.service";
import { UserService } from "src/api/user/services/user.service";
import { StatementMaxDate } from "../entities/statement-max-dates";
import { MailService } from "src/mail/mail.service";

@Controller('fechas-declaracion-renta')
export class DateDeclareController {
  constructor(
    private dateDeclare: DateDeclareService,
    private userService: UserService,
    private mailService: MailService,
  ) { }

  @Post()
  async createSubmission(@Body() body: StatementDateRequestDto): Promise<StatementMaxDate> {
    const user = await this.userService.findUpdateOrCreate(body.user);

    await this.dateDeclare.createSubmission(body.lastNITDigit, user.id);

    const statementMaxDate = await this.dateDeclare.getMaxDateByNit(body.lastNITDigit);

    await this.mailService.sendStatementEmail(user, statementMaxDate);

    return statementMaxDate;
  }
}
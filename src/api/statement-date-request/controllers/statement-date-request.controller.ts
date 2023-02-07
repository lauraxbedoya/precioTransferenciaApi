import { Body, Controller, Post } from "@nestjs/common";
import { StatementDateRequestDto } from "../statement-date-request.dto";
import { DateDeclareService } from "../services/statement-date-request.service";

@Controller('fechas-declaracion-renta')
export class DateDeclareController {
  constructor(
    private dateDeclare: DateDeclareService,
  ) { }

  @Post()
  createSubmission(@Body() body: StatementDateRequestDto) {
    return this.dateDeclare.createSubmission(body)
  }
}
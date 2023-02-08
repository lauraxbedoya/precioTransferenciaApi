import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StatementDateRequest } from "../entities/statement-date-request";
import { StatementMaxDate } from "../entities/statement-max-dates";


@Injectable()
export class DateDeclareService {
  constructor(
    @InjectRepository(StatementDateRequest)
    private submissionRepo: Repository<StatementDateRequest>,
    @InjectRepository(StatementMaxDate)
    private maxDateRepo: Repository<StatementMaxDate>,
  ) { }


  async createSubmission(lastNITDigit: number, userId: number): Promise<StatementDateRequest> {
    const newSubmission = new StatementDateRequest();
    newSubmission.userId = userId;
    newSubmission.lastNITDigit = lastNITDigit;

    return await this.submissionRepo.save(newSubmission);
  }

  async getMaxDateByNit(lastNITDigit: number) {
    return await this.maxDateRepo.findOneBy({ lastNITDigit });
  }
}
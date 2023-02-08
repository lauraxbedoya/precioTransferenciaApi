import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MailService } from "src/mail/mail.service";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/services/user.service";
import { DateDeclareController } from "./controllers/statement-date-request.controller";
import { StatementDateRequest } from "./entities/statement-date-request";
import { StatementMaxDate } from "./entities/statement-max-dates";
import { DateDeclareService } from "./services/statement-date-request.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([StatementDateRequest, User, StatementMaxDate]),
  ],
  providers: [DateDeclareService, UserService, MailService],
  controllers: [DateDeclareController],
  exports: [DateDeclareService]
})
export class StatementDateRequestModule { }

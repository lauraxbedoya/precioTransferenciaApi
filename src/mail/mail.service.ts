import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { StatementMaxDate } from 'src/api/statement-date-request/entities/statement-max-dates';
import { User } from 'src/api/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }


  async sendUserConfirmation(user: Partial<User>, answers: { question: string, answer: string }[]) {

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Se ha realizado una nueva solicitud "Aplica a la obligación"',
      template: './confirmation',
      context: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        user,
        answers
      },
    });
  }


  async sendStatementEmail(user: Partial<User>, statementMaxDate: StatementMaxDate) {

    await this.mailerService.sendMail({
      to: 'laura-ximena-13@hotmail.com',
      subject: 'Se ha realizado una nueva solicitud "Fechas para declarar renta"',
      template: './confirmation-date-request',
      context: {
        name: user.name,
        lastName: user.lastName,
        statementMaxDate
      },
    })
  }


  async sendRegistrationConfirmed(user: Partial<User>) {

    await this.mailerService.sendMail({
      to: 'laura.bedoya194@gmail.com',
      subject: `${user.name}, Bienvenid@ a PrecioTransferencia`,
      template: './confirmation-user-registered',
      context: {
        name: user.name,
      },
    })
  }
}
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
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
}
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({

        transport: {
          host: 'smtp.gmail.com',
          secure: false,
          auth: {
            user: config.get<string>('SMTP_EMAIL_FROM'),
            pass: config.get<string>('SMTP_EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"No Reply" <noreply@tributi.com>',
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService]
    })
  ],
  providers: [MailService],
  exports: [MailService], // 👈 export for DI
})
export class MailModule { }


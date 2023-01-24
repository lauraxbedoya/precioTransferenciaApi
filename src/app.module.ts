import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/user/auth/auth.module';
import { User } from './api/user/entities/user.entity';
import { UsersModule } from './api/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { ShouldDeclareSubmissions } from './api/should-declare/entities/should-declare-submissions.entity';
import { ShouldDeclareQuestions } from './api/should-declare/entities/should-declare-questions.entity';
import { ShouldDeclareAnswers } from './api/should-declare/entities/should-declare-answers.entity';
import { ShouldDeclareQuestionOptions } from './api/should-declare/entities/should-declare-question-options.entity';
import { ShouldDeclareModule } from './api/should-declare/should-declare.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }),
  TypeOrmModule.forRootAsync({
    useFactory: async (config: ConfigService) => {

      return {
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User, ShouldDeclareSubmissions, ShouldDeclareQuestions, ShouldDeclareAnswers, ShouldDeclareQuestionOptions],
        synchronize: true,
      }
    },
    inject: [ConfigService]
  }),
    UsersModule,
    AuthModule,
    ShouldDeclareModule
  ],
})
export class AppModule { }

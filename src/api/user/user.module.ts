import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserController } from './controllers/user.controller';
import { UserCompany } from './entities/user-company.entity';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UniqueFields } from './unique-fields.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserCompany]), forwardRef(() => AuthModule)],
  providers: [UserService, UniqueFields, JwtStrategy, MailService],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule { }
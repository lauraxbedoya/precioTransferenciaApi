import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UniqueFields } from './unique-fields.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  providers: [UserService, UniqueFields, JwtStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule { }
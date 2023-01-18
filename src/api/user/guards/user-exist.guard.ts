import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserExistGuard implements CanActivate {
  constructor(private reflector: Reflector,
    @InjectRepository(User)
    private usersRepo: Repository<User>) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const keyName = this.reflector.get<string>('keyName', context.getHandler());

    const request = context.switchToHttp().getRequest();
    let user: User;

    const userIdInParams = request.params[keyName];
    if (userIdInParams) {
      user = await this.usersRepo.findOneBy({ id: userIdInParams });
      if (!user) {
        throw new NotFoundException("user not found");
      }
    }

    const userIdInBody = request.body[keyName];
    if (userIdInBody) {
      user = await this.usersRepo.findOneBy({ id: userIdInBody });
      if (!user) {
        throw new NotFoundException("user not found");
      }
    }

    const userIdInQuery = request.query[keyName];
    if (userIdInQuery) {
      user = await this.usersRepo.findOneBy({ id: userIdInQuery });
      if (!user) {
        throw new NotFoundException("user not found");
      }
    }

    return true;
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from '../user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>
  ) { }

  findAll() {
    return this.usersRepo.find();
  }

  findOne(id: number) {
    return this.usersRepo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.usersRepo.findOneBy({ email });
  }

  async remove(id: number) {
    const userDeleted = await this.usersRepo.delete(id);
    return { message: 'Se ha eliminado correctamente', userDeleted };
  }

  async createUserAdmin(body: CreateUserDto) {
    const saltOrRounds = 10;
    const password = body.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return this.usersRepo.save({ ...body, password: hash })
  }

  async create(user: Partial<User>) {
    let hash = null;
    if (user.password) {
      const saltOrRounds = 10;
      const password = user.password;
      hash = await bcrypt.hash(password, saltOrRounds);
    }
    return this.usersRepo.save({ ...user, password: hash });
  }

  async update(id: number, body: UpdateUserDto) {
    const currentUser = await this.usersRepo.findOneBy({ id });

    Object.keys(body).forEach(key => {
      if (body[key] !== undefined && body[key] !== currentUser[key]) {
        currentUser[key] = body[key];
      }
    });
    return this.usersRepo.save(currentUser);
  }
}
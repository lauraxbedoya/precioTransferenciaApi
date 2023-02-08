import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUnknownUserDto, CreateUserDto, UpdateUserDto } from '../user.dto';
import { UserCreatedFrom } from '../user.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }


  async findUpdateOrCreate(user: CreateUnknownUserDto) {
    let userDB = await this.findByEmail(user.email);
    if (!userDB) {
      userDB = await this.create({ ...user, createdFrom: UserCreatedFrom.DateDeclare });
    } else {
      if (userDB.name !== user.name || userDB.lastName !== user.lastName) {
        const userUpdate = await this.update(userDB.id, { name: user.name, lastName: user.lastName })
        this.userRepo.save(userUpdate)
      }
    }
    return userDB;
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async remove(id: number) {
    const userDeleted = await this.userRepo.delete(id);
    return { message: 'Se ha eliminado correctamente', userDeleted };
  }

  async createUserAdmin(body: CreateUserDto) {
    const saltOrRounds = 10;
    const password = body.password;
    const hash = await bcrypt.hash(password, saltOrRounds);

    return this.userRepo.save({ ...body, password: hash })
  }

  async create(user: Partial<User>) {
    let hash = null;
    if (user.password) {
      const saltOrRounds = 10;
      const password = user.password;
      hash = await bcrypt.hash(password, saltOrRounds);
    }
    return this.userRepo.save({ ...user, password: hash });
  }

  async update(id: number, body: UpdateUserDto) {
    const currentUser = await this.userRepo.findOneBy({ id });

    Object.keys(body).forEach(key => {
      if (body[key] !== undefined && body[key] !== currentUser[key]) {
        currentUser[key] = body[key];
      }
    });
    return this.userRepo.save(currentUser);
  }
}
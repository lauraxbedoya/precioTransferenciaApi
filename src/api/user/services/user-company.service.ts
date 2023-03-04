import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCompany } from '../entities/user-company.entity';

@Injectable()
export class UserCompanyService {
  constructor(
    @InjectRepository(UserCompany)
    private userCompanyRepo: Repository<UserCompany>,
  ) { }


  async findUpdateOrCreate(userId: number, nit: string) {
    let userCompanyDB = await this.userCompanyRepo.findOneBy({ userId, nit });
    if (!userCompanyDB) {
      userCompanyDB = await this.create({ userId, nit });
    }
    return userCompanyDB;
  }

  async create(userCompany: Partial<UserCompany>) {
    return this.userCompanyRepo.save(userCompany);
  }
}
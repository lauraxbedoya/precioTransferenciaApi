import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@ValidatorConstraint({ name: 'UniqueFields', async: true })
@Injectable()
export class UniqueFields implements ValidatorConstraintInterface {

  propsTranslate = {
    email: 'Correo electrónico'
  }

  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>
  ) { }

  async validate(value: string, args: ValidationArguments) {
    const field = args.constraints[0];

    const user = (await this.usersRepo.findOneBy({ [field]: value }));
    return !user;
  }

  defaultMessage(args: ValidationArguments) {
    const field = args.constraints[0];
    return `El ${this.propsTranslate[field]} ya existe`;
  }
}
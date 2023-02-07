import { Injectable } from "@nestjs/common";
import { UserService } from "src/api/user/services/user.service";
import { UserCreatedFrom } from "src/api/user/user.enum";
import { Repository } from "typeorm";
import { User } from "src/api/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { StatementDateRequest } from "../entities/statement-date-request";
import { StatementDateRequestDto } from "../statement-date-request.dto";


@Injectable()
export class DateDeclareService {
  constructor(
    @InjectRepository(StatementDateRequest)
    private submissionRepo: Repository<StatementDateRequest>,
    @InjectRepository(User)
    private userRepo: Repository<User>,

    private userService: UserService,
  ) { }


  async createSubmission(dateDeclare: StatementDateRequestDto): Promise<StatementDateRequest> {
    let userDB = await this.userService.findByEmail(dateDeclare.user.email);
    if (!userDB) {
      userDB = await this.userService.create({ ...dateDeclare.user, createdFrom: UserCreatedFrom.DateDeclare });
    } else {
      if (userDB.name !== dateDeclare.user.name || userDB.lastName !== dateDeclare.user.lastName) {
        const userUpdate = await this.userService.update(userDB.id, { name: dateDeclare.user.name, lastName: dateDeclare.user.lastName })
        this.userRepo.save(userUpdate)
      }
    }
    const newSubmission = new StatementDateRequest();
    newSubmission.userId = userDB.id;
    newSubmission.lastNITDigit = dateDeclare.lastNITDigit;
    return this.submissionRepo.save(newSubmission);
  }
}
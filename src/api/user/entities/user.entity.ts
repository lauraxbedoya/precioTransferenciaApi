import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserCreatedFrom, UserRole } from '../user.enum';
import { ShouldDeclareSubmissions } from '../../should-declare/entities/should-declare-submissions.entity';
import { StatementDateRequest } from 'src/api/statement-date-request/entities/statement-date-request';
import { UserCompany } from './user-company.entity';

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  lastName: string;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  photoUrl: string;

  @Column({ type: 'varchar', nullable: true })
  phoneNumber: string;

  @Column({ type: 'varchar', nullable: true })
  googleId: string;

  @Column({ enum: UserRole, default: UserRole.Customer })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @Column(({ type: 'varchar', default: UserCreatedFrom.SignUp }))
  createdFrom: UserCreatedFrom;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ShouldDeclareSubmissions, (submission) => submission.user)
  submissions: ShouldDeclareSubmissions[];

  @OneToMany(() => StatementDateRequest, (date) => date.user)
  dateDeclare: StatementDateRequest[];

  @OneToMany(() => UserCompany, (userCompany) => userCompany.user)
  companies: UserCompany[];
}
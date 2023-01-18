import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShouldDeclareAnswers } from "./should-declare-answers.entity";
import { User } from "./user.entity";

@Entity('submissions')
export class ShouldDeclareSubmissions extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.submissions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ShouldDeclareAnswers, (answer) => answer.submission)
  answers: ShouldDeclareAnswers[];
}
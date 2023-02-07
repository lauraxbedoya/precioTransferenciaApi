import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShouldDeclareAnswer } from "./should-declare-answers.entity";
import { User } from "../../user/entities/user.entity";

@Entity('should-declare-submissions')
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

  @OneToMany(() => ShouldDeclareAnswer, (answer) => answer.submission)
  answers: ShouldDeclareAnswer[];
}
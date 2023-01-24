import { QuestionType } from "src/api/should-declare/question.enum";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShouldDeclareAnswers } from "./should-declare-answers.entity";
import { ShouldDeclareQuestionOptions } from "./should-declare-question-options.entity";

@Entity('questions')
export class ShouldDeclareQuestions extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  question: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  icon: string;

  @Column({ enum: QuestionType })
  type: QuestionType;

  @Column({ type: 'number', nullable: true })
  parentQuestionId: number;

  @Column({ type: 'varchar' })
  showIfAnswer: string;

  @OneToMany(() => ShouldDeclareQuestions, (question) => question.parentQuestionId)
  childrenQuestions: ShouldDeclareQuestions[];

  @ManyToOne(() => ShouldDeclareQuestions, (question) => question.childrenQuestions)
  @JoinColumn({ name: 'parentQuestionId' })
  parentQuestion?: ShouldDeclareQuestions;

  @OneToMany(() => ShouldDeclareAnswers, (answer) => answer.question)
  answers: ShouldDeclareAnswers[];

  @OneToMany(() => ShouldDeclareQuestionOptions, (questionOption) => questionOption.question)
  options: ShouldDeclareQuestionOptions[];
}
import { QuestionType } from "src/api/should-declare/question.enum";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ShouldDeclareAnswer } from "./should-declare-answers.entity";
import { ShouldDeclareQuestionOptions } from "./should-declare-question-options.entity";

@Entity('should_declare_questions')
export class ShouldDeclareQuestions extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  question: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  icon: string;

  @Column({ enum: QuestionType, nullable: true })
  type: QuestionType;

  @Column({ type: 'number', nullable: true })
  parentQuestionId: number;

  @Column({ type: 'varchar', nullable: true })
  showIfAnswer: string;

  @OneToMany(() => ShouldDeclareQuestions, (question) => question.parentQuestionId)
  childrenQuestions: ShouldDeclareQuestions[];

  @ManyToOne(() => ShouldDeclareQuestions, (question) => question.childrenQuestions)
  @JoinColumn({ name: 'parentQuestionId' })
  parentQuestion?: ShouldDeclareQuestions;

  @OneToMany(() => ShouldDeclareAnswer, (answer) => answer.question)
  answers: ShouldDeclareAnswer[];

  @OneToMany(() => ShouldDeclareQuestionOptions, (questionOption) => questionOption.question)
  options: ShouldDeclareQuestionOptions[];
}
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShouldDeclareQuestions } from "./should-declare-questions.entity";

@Entity('should-declare-question-options')
export class ShouldDeclareQuestionOptions extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'number' })
  questionId: number;

  @ManyToOne(() => ShouldDeclareQuestions, (question) => question.options)
  @JoinColumn({ name: 'questionId' })
  question: ShouldDeclareQuestions;

  @Column({ type: 'varchar' })
  option: string;
}
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShouldDeclareQuestions } from "./should-declare-questions.entity";
import { ShouldDeclareSubmissions } from "./should-declare-submissions.entity";

@Entity('should-declare-answers')
export class ShouldDeclareAnswer extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'number' })
  submissionId: number;

  @ManyToOne(() => ShouldDeclareSubmissions, (submission) => submission.answers)
  @JoinColumn({ name: 'submissionId' })
  submission: ShouldDeclareSubmissions;

  @Column({ type: 'number' })
  questionId: number;

  @ManyToOne(() => ShouldDeclareQuestions, (question) => question.answers)
  @JoinColumn({ name: 'questionId' })
  question: ShouldDeclareQuestions;

  @Column({ type: 'varchar' })
  answer: string;
}
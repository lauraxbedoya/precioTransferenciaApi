import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('statement-max-dates')
export class StatementMaxDate extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: true })
  lastNITDigit: number;

  @Column({ type: 'date' })
  expireDate: string;

  @Column()
  documentUrl: string;
}
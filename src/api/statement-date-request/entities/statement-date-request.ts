import { User } from "src/api/user/entities/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('statement-date-requests')
export class StatementDateRequest extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.dateDeclare)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: false })
  lastNITDigit: number;

  @CreateDateColumn()
  createdAt: Date;
}
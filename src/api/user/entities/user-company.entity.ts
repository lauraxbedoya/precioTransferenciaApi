import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user-companies')
export class UserCompany extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer' })
  userId: number;

  @ManyToOne(() => User, (user) => user.companies)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'varchar' })
  nit: string;
}
import { Operation } from 'src/operations/entities/operation.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @Column({ type: 'int', nullable: true })
  operationId: number;

  @Column('decimal')
  amount: number;

  @Column('decimal')
  userBalance: number;

  @Column()
  operationResponse: string;

  @CreateDateColumn()
  date: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.records)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Operation, (operation) => operation.records)
  @JoinColumn()
  operation: Operation;
}

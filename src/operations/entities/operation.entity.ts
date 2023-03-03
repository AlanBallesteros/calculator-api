import { Record } from 'src/records/entities/record.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ type: 'decimal' })
  cost: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Record, (record) => record.operation)
  records: Record[];
}

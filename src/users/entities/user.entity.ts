import { Record } from 'src/records/entities/record.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('bool')
  status: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Record, (record) => record.user)
  records: Record[];
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity({ name: 'cost_entries' })
export class CostEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('date')
  date: Date;

  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => Task, (task) => task.costEntries)
  task: Task;

  @ManyToOne(() => User, (user) => user.costEntries, { eager: true })
  user: User;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity({ name: 'time_logs' })
export class TimeLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  hours: number;

  @Column('date')
  date: Date;

  @ManyToOne(() => Task, (task) => task.timeLogs)
  task: Task;

  @ManyToOne(() => User, (user) => user.timeLogs, { eager: true })
  user: User;
}

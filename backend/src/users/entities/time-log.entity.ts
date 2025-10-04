import { Entity, Column, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'time_logs' })
export class TimeLog extends BaseEntity {
  @Column('decimal', { precision: 10, scale: 2 })
  hours: number;

  @Column('date')
  date: Date;

  @ManyToOne(() => Task, (task) => task.timeLogs)
  task: Task;

  @ManyToOne(() => User, (user) => user.timeLogs, { eager: true })
  user: User;

  @Column({ nullable: true })
  projectId: string;
}

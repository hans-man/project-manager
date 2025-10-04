import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { User } from './user.entity';
import { TimeLog } from './time-log.entity';



import { BaseEntity } from '../../common/entities/base.entity';

export enum TaskStatus {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum TaskType {
  TASK = 'TASK',
  BUG = 'BUG',
  FEATURE = 'FEATURE',
}

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TO_DO,
  })
  status: TaskStatus;

  @Column({
    type: 'enum',
    enum: TaskType,
    default: TaskType.TASK,
  })
  type: TaskType;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({ type: 'int', nullable: true })
  storyPoints: number;

  @Column({ nullable: true })
  projectId: string;

  @ManyToOne(() => User, (user) => user.assignedTasks, {
    nullable: true,
  })
  assignee: User;

  @OneToMany(() => TimeLog, (timeLog) => timeLog.task)
  timeLogs: TimeLog[];




}

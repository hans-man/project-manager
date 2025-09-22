import { Entity, Column, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';
import { Project } from './project.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'cost_entries' })
export class CostEntry extends BaseEntity {
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

  @ManyToOne(() => Project, (project) => project.costEntries) // Add ManyToOne to Project
  project: Project;
}

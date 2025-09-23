import { Entity, Column, OneToMany } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Task } from './task.entity';
import { WikiPage } from './wiki-page.entity';
import { TimeLog } from './time-log.entity';
import { CostEntry } from './cost-entry.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // In a real app, this should be hashed

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];

  @OneToMany(() => Task, (task) => task.assignee)
  assignedTasks: Task[];

  @OneToMany(() => WikiPage, (wikiPage) => wikiPage.author)
  wikiPages: WikiPage[];

  @OneToMany(() => TimeLog, (timeLog) => timeLog.user)
  timeLogs: TimeLog[];

  @OneToMany(() => CostEntry, (costEntry) => costEntry.user)
  costEntries: CostEntry[];
}

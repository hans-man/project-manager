import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Issue } from '../../issues/entities/issue.entity';
import { TimeLog } from '../../users/entities/time-log.entity';
import { CostEntry } from '../../users/entities/cost-entry.entity';
import { WikiPage } from '../../users/entities/wiki-page.entity';
import { Task } from '../../users/entities/task.entity';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true }) // Add budget column
  budget: number;

  // Define relationships if needed
  @OneToMany(() => Issue, (issue) => issue.project)
  issues: Issue[];

  @OneToMany(() => TimeLog, (timeLog) => timeLog.project)
  timeLogs: TimeLog[];

  @OneToMany(() => CostEntry, (costEntry) => costEntry.project)
  costEntries: CostEntry[];

  @OneToMany(() => WikiPage, (wikiPage) => wikiPage.project)
  wikiPages: WikiPage[];

  @OneToMany(() => Task, (task) => task.project) // Add OneToMany to Task
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.projects) // Add ManyToOne to User (owner)
  owner: User;
}

import { Entity, Column, OneToMany } from 'typeorm';
import { Issue } from '../../issues/entities/issue.entity';
import { Task } from './task.entity';
import { WikiPage } from './wiki-page.entity';
import { TimeLog } from './time-log.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  loginId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // In a real app, this should be hashed

  @Column({ nullable: true })
  departmentCode?: string;

  @Column({ nullable: true })
  positionCode?: string;

  @Column({ nullable: true })
  roleCode?: string;

  @Column({ nullable: true })
  userTypeCode?: string;

  @Column({ type: 'date', nullable: true })
  hireDate?: Date;

  @Column({ type: 'date', nullable: true })
  resignationDate?: Date;

  @OneToMany(() => Task, (task) => task.assignee)
  assignedTasks: Task[];

  @OneToMany(() => WikiPage, (wikiPage) => wikiPage.author)
  wikiPages: WikiPage[];

  @OneToMany(() => TimeLog, (timeLog) => timeLog.user)
  timeLogs: TimeLog[];

  @OneToMany(() => Issue, issue => issue.assignee)
  assignedIssues: Issue[];

  @OneToMany(() => Issue, issue => issue.manager)
  managedIssues: Issue[];

  @OneToMany(() => Issue, issue => issue.businessOwner)
  ownedIssues: Issue[];
}

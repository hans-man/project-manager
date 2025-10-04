import { Issue } from '../../issues/entities/issue.entity';
import { Task } from './task.entity';
import { WikiPage } from './wiki-page.entity';
import { TimeLog } from './time-log.entity';
import { BaseEntity } from '../../common/entities/base.entity';
export declare class User extends BaseEntity {
    name: string;
    loginId: string;
    email: string;
    password: string;
    departmentCode?: string;
    positionCode?: string;
    roleCode?: string;
    userTypeCode?: string;
    hireDate?: Date;
    resignationDate?: Date;
    assignedTasks: Task[];
    wikiPages: WikiPage[];
    timeLogs: TimeLog[];
    assignedIssues: Issue[];
    managedIssues: Issue[];
    ownedIssues: Issue[];
}

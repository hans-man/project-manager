import { Project } from '../../projects/entities/project.entity';
import { Task } from './task.entity';
import { WikiPage } from './wiki-page.entity';
import { TimeLog } from './time-log.entity';
import { CostEntry } from './cost-entry.entity';
import { BaseEntity } from '../../common/entities/base.entity';
export declare class User extends BaseEntity {
    name: string;
    email: string;
    password: string;
    projects: Project[];
    assignedTasks: Task[];
    wikiPages: WikiPage[];
    timeLogs: TimeLog[];
    costEntries: CostEntry[];
}

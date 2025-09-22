import { Issue } from '../../issues/entities/issue.entity';
import { TimeLog } from './time-log.entity';
import { CostEntry } from './cost-entry.entity';
import { WikiPage } from './wiki-page.entity';
import { Task } from './task.entity';
import { User } from './user.entity';
import { BaseEntity } from '../../common/entities/base.entity';
export declare class Project extends BaseEntity {
    name: string;
    description: string;
    budget: number;
    issues: Issue[];
    timeLogs: TimeLog[];
    costEntries: CostEntry[];
    wikiPages: WikiPage[];
    tasks: Task[];
    owner: User;
}

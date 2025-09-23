import { Issue } from '../../issues/entities/issue.entity';
import { TimeLog } from '../../users/entities/time-log.entity';
import { CostEntry } from '../../users/entities/cost-entry.entity';
import { WikiPage } from '../../users/entities/wiki-page.entity';
import { Task } from '../../users/entities/task.entity';
import { User } from '../../users/entities/user.entity';
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

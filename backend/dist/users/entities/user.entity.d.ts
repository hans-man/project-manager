import { Project } from './project.entity';
import { Task } from './task.entity';
import { WikiPage } from './wiki-page.entity';
import { TimeLog } from './time-log.entity';
import { CostEntry } from './cost-entry.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    projects: Project[];
    assignedTasks: Task[];
    wikiPages: WikiPage[];
    timeLogs: TimeLog[];
    costEntries: CostEntry[];
}

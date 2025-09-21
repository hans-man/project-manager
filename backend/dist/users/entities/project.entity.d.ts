import { User } from './user.entity';
import { Task } from './task.entity';
import { WikiPage } from './wiki-page.entity';
export declare class Project {
    id: number;
    name: string;
    description: string;
    budget: number;
    owner: User;
    tasks: Task[];
    wikiPages: WikiPage[];
}

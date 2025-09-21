import { Project } from './project.entity';
import { User } from './user.entity';
export declare class WikiPage {
    id: number;
    title: string;
    content: string;
    project: Project;
    author: User;
}

import { Task } from './task.entity';
import { User } from './user.entity';
import { Project } from './project.entity';
import { BaseEntity } from '../../common/entities/base.entity';
export declare class CostEntry extends BaseEntity {
    amount: number;
    date: Date;
    description: string;
    task: Task;
    user: User;
    project: Project;
}

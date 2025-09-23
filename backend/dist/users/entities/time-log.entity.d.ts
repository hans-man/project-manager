import { Task } from './task.entity';
import { User } from './user.entity';
import { Project } from '../../projects/entities/project.entity';
import { BaseEntity } from '../../common/entities/base.entity';
export declare class TimeLog extends BaseEntity {
    hours: number;
    date: Date;
    task: Task;
    user: User;
    project: Project;
}

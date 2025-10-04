import { User } from './user.entity';
import { TimeLog } from './time-log.entity';
import { BaseEntity } from '../../common/entities/base.entity';
export declare enum TaskStatus {
    TO_DO = "TO_DO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export declare enum TaskType {
    TASK = "TASK",
    BUG = "BUG",
    FEATURE = "FEATURE"
}
export declare class Task extends BaseEntity {
    title: string;
    description: string;
    status: TaskStatus;
    type: TaskType;
    startDate: Date;
    endDate: Date;
    storyPoints: number;
    projectId: string;
    assignee: User;
    timeLogs: TimeLog[];
}

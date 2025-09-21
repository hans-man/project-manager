import { Task } from './task.entity';
import { User } from './user.entity';
export declare class TimeLog {
    id: number;
    hours: number;
    date: Date;
    task: Task;
    user: User;
}

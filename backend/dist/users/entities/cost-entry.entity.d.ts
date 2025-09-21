import { Task } from './task.entity';
import { User } from './user.entity';
export declare class CostEntry {
    id: number;
    amount: number;
    date: Date;
    description: string;
    task: Task;
    user: User;
}

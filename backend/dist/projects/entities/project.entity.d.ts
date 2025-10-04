import { Issue } from '../../issues/entities/issue.entity';
import { BaseEntity } from '../../common/entities/base.entity';
export declare class Project extends BaseEntity {
    name: string;
    description: string;
    budget: number;
    status: string;
    issues: Issue[];
    ownerId: string;
}

import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';
import { BaseEntity } from '../../common/entities/base.entity';
export declare class Issue extends BaseEntity {
    title: string;
    description: string;
    taskName: string;
    testClassification: string;
    testRound: number;
    programId: string;
    programName: string;
    programDescription: string;
    assigneeId: string;
    assignee: User;
    developmentDueDate: Date;
    developmentCompletionDate: Date;
    status: string;
    priority: string;
    managerId: string;
    manager: User;
    managerReviewCompletionDate: Date;
    businessOwnerId: string;
    businessOwner: User;
    businessOwnerReviewCompletionDate: Date;
    project: Project;
}

import { Project } from '../../users/entities/project.entity';
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
    assigneeName: string;
    developmentDueDate: Date;
    developmentCompletionDate: Date;
    status: string;
    managerName: string;
    managerReviewCompletionDate: Date;
    businessOwnerName: string;
    businessOwnerReviewCompletionDate: Date;
    project: Project;
}

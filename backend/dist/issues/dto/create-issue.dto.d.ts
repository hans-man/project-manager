export declare class CreateIssueDto {
    title: string;
    description: string;
    taskName?: string;
    testClassification?: string;
    testRound?: number;
    programId?: string;
    programName?: string;
    programDescription?: string;
    assigneeId?: string;
    developmentDueDate?: Date;
    developmentCompletionDate?: Date;
    status?: string;
    managerId?: string;
    managerReviewCompletionDate?: Date;
    businessOwnerId?: string;
    businessOwnerReviewCompletionDate?: Date;
    projectId: string;
}

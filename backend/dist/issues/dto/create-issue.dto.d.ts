export declare class CreateIssueDto {
    title: string;
    description: string;
    taskName?: string;
    testClassification?: string;
    testRound?: number;
    programId?: string;
    programName?: string;
    programDescription?: string;
    assigneeName?: string;
    developmentDueDate?: Date;
    developmentCompletionDate?: Date;
    status?: string;
    managerName?: string;
    managerReviewCompletionDate?: Date;
    businessOwnerName?: string;
    businessOwnerReviewCompletionDate?: Date;
    projectId: number;
}

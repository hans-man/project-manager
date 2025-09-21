import { CreateIssueDto } from './dto/create-issue.dto';
export declare class IssuesService {
    create(createIssueDto: CreateIssueDto): {
        message: string;
        issue: CreateIssueDto;
    };
    findAll(): string[];
}

import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
export declare class IssuesController {
    private readonly issuesService;
    constructor(issuesService: IssuesService);
    create(createIssueDto: CreateIssueDto): Promise<import("./entities/issue.entity").Issue>;
    findAll(): Promise<import("./entities/issue.entity").Issue[]>;
}

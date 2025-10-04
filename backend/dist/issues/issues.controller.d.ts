import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
export declare class IssuesController {
    private readonly issuesService;
    constructor(issuesService: IssuesService);
    create(createIssueDto: CreateIssueDto): Promise<import("./entities/issue.entity").Issue>;
    findAll(): Promise<import("./entities/issue.entity").Issue[]>;
    findOne(id: string): Promise<import("./entities/issue.entity").Issue | null>;
    update(id: string, updateIssueDto: UpdateIssueDto): Promise<import("./entities/issue.entity").Issue>;
}

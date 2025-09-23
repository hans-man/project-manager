import { Repository } from 'typeorm';
import { Issue } from './entities/issue.entity';
import { Project } from '../projects/entities/project.entity';
import { CreateIssueDto } from './dto/create-issue.dto';
export declare class IssuesService {
    private readonly issueRepository;
    private readonly projectRepository;
    constructor(issueRepository: Repository<Issue>, projectRepository: Repository<Project>);
    create(createIssueDto: CreateIssueDto): Promise<Issue>;
    findAll(): Promise<Issue[]>;
}

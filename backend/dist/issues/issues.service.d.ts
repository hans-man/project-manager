import { Repository } from 'typeorm';
import { Issue } from './entities/issue.entity';
import { Project } from '../projects/entities/project.entity';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { UsersService } from '../users/users.service';
export declare class IssuesService {
    private readonly issueRepository;
    private readonly projectRepository;
    private readonly usersService;
    constructor(issueRepository: Repository<Issue>, projectRepository: Repository<Project>, usersService: UsersService);
    create(createIssueDto: CreateIssueDto): Promise<Issue>;
    findAll(): Promise<Issue[]>;
    findOne(id: number): Promise<Issue | null>;
    update(id: number, updateIssueDto: UpdateIssueDto): Promise<Issue>;
}

import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Issue } from '../issues/entities/issue.entity';
import { TimeLog } from '../users/entities/time-log.entity';
import { InstanceCode } from '../entities/instance-code.entity';
import { DashboardStatsDto } from './dto/dashboard.dto';
export declare class DashboardService {
    private readonly userRepository;
    private readonly projectRepository;
    private readonly issueRepository;
    private readonly timeLogRepository;
    private readonly instanceCodeRepository;
    constructor(userRepository: Repository<User>, projectRepository: Repository<Project>, issueRepository: Repository<Issue>, timeLogRepository: Repository<TimeLog>, instanceCodeRepository: Repository<InstanceCode>);
    getStats(): Promise<DashboardStatsDto>;
}

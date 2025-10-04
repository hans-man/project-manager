import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Issue } from '../issues/entities/issue.entity';
import { TimeLog } from '../users/entities/time-log.entity';
import { InstanceCode } from '../entities/instance-code.entity';
import { DashboardStatsDto } from './dto/dashboard.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
    @InjectRepository(TimeLog)
    private readonly timeLogRepository: Repository<TimeLog>,
    @InjectRepository(InstanceCode)
    private readonly instanceCodeRepository: Repository<InstanceCode>,
  ) {}

  async getStats(): Promise<DashboardStatsDto> {
    const totalUsers = await this.userRepository.count();
    const totalProjects = await this.projectRepository.count();
    const totalIssues = await this.issueRepository.count();
    const totalTimeLogs = await this.timeLogRepository.count();
    const totalInstanceCodes = await this.instanceCodeRepository.count();

    const projectsByStatus = await this.projectRepository
      .createQueryBuilder('project')
      .select("COALESCE(project.status, 'Unknown')", 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('project.status')
      .getRawMany();

    const issuesByStatus = await this.issueRepository
      .createQueryBuilder('issue')
      .select("COALESCE(issue.status, 'Unknown')", 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('issue.status')
      .getRawMany();

    const issuesByPriority = await this.issueRepository
      .createQueryBuilder('issue')
      .select("COALESCE(issue.priority, 'Unknown')", 'priority')
      .addSelect('COUNT(*)', 'count')
      .groupBy('issue.priority')
      .getRawMany();

    const timeLogsByUser = await this.timeLogRepository
      .createQueryBuilder('timeLog')
      .leftJoin('timeLog.user', 'user')
      .select('COALESCE(user.name, "Unknown")', 'userName')
      .addSelect('SUM(timeLog.hours)', 'totalHours')
      .groupBy('user.name')
      .getRawMany();

    return {
      totalUsers,
      totalProjects,
      totalIssues,
      totalTimeLogs,
      totalInstanceCodes,
      projectsByStatus,
      issuesByStatus,
      issuesByPriority,
      timeLogsByUser,
    };
  }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from './entities/issue.entity';
import { Project } from '../projects/entities/project.entity';
import { CreateIssueDto } from './dto/create-issue.dto';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createIssueDto: CreateIssueDto): Promise<Issue> {
    const { projectId, ...issueData } = createIssueDto;
    const project = await this.projectRepository.findOneBy({ id: projectId });

    if (!project) {
      throw new NotFoundException(`Project with ID "${projectId}" not found`);
    }

    const newIssue = this.issueRepository.create({
      ...issueData,
      project,
    });

    return this.issueRepository.save(newIssue);
  }

  async findAll(): Promise<Issue[]> {
    return this.issueRepository.find({ relations: ['project'] });
  }
}
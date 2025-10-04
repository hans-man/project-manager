import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Issue } from './entities/issue.entity';
import { Project } from '../projects/entities/project.entity';
import { User } from '@users/entities/user.entity';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue)
    private readonly issueRepository: Repository<Issue>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly usersService: UsersService,
  ) {}

  async create(createIssueDto: CreateIssueDto): Promise<Issue> {
    const { projectId, assigneeId, managerId, businessOwnerId, ...issueData } = createIssueDto;

    const project = await this.projectRepository.findOne({ where: { id: parseInt(projectId, 10) } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    let assignee: User | null = null;
    if (assigneeId) {
      assignee = await this.usersService.findOneByLoginId(assigneeId);
      if (!assignee) {
        throw new NotFoundException(`Assignee with ID ${assigneeId} not found`);
      }
    }

    let manager: User | null = null;
    if (managerId) {
      manager = await this.usersService.findOneByLoginId(managerId);
      if (!manager) {
        throw new NotFoundException(`Manager with ID ${managerId} not found`);
      }
    }

    let businessOwner: User | null = null;
    if (businessOwnerId) {
      businessOwner = await this.usersService.findOneByLoginId(businessOwnerId);
      if (!businessOwner) {
        throw new NotFoundException(`Business Owner with ID ${businessOwnerId} not found`);
      }
    }

    const newIssue = this.issueRepository.create({
      ...issueData,
      project,
      assigneeId: assignee ? assignee.loginId : undefined,
      managerId: manager ? manager.loginId : undefined,
      businessOwnerId: businessOwner ? businessOwner.loginId : undefined,
    });
    return this.issueRepository.save(newIssue);
  }

  async findAll(): Promise<Issue[]> {
    return this.issueRepository.find({ relations: ['project', 'assignee', 'manager', 'businessOwner'] });
  }

  async findOne(id: number): Promise<Issue | null> {
    const issue = await this.issueRepository.findOne({
      where: { id },
      relations: ['project', 'assignee', 'manager', 'businessOwner'],
    });
    if (!issue) {
      throw new NotFoundException(`Issue with ID "${id}" not found`);
    }
    return issue;
  }

  async update(id: number, updateIssueDto: UpdateIssueDto): Promise<Issue> {
    const issue = await this.findOne(id);
    if (!issue) {
      throw new NotFoundException(`Issue with ID "${id}" not found`);
    }

    const { projectId, assigneeId, managerId, businessOwnerId, ...restOfDto } = updateIssueDto;
    const updateObject: Partial<Issue> = { ...restOfDto };

    if (projectId) {
      const project = await this.projectRepository.findOne({ where: { id: parseInt(projectId, 10) } });
      if (!project) {
        throw new NotFoundException(`Project with ID ${projectId} not found`);
      }
      updateObject.project = project;
    }
    if (assigneeId) {
      updateObject.assigneeId = String(assigneeId);
    }
    if (managerId) {
      updateObject.managerId = String(managerId);
    }
    if (businessOwnerId) {
      updateObject.businessOwnerId = String(businessOwnerId);
    }

    await this.issueRepository.update(id, updateObject);
    const updatedIssue = await this.findOne(id);
    if (!updatedIssue) {
      throw new NotFoundException(`Issue with ID "${id}" not found after update`);
    }
    return updatedIssue;
  }
}

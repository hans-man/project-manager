import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../users/entities/project.entity'; // Import Project entity
import { CreateProjectDto } from './dto/create-project.dto'; // Will create this DTO
import { UpdateProjectDto } from './dto/update-project.dto'; // Will create this DTO
import { User } from '../users/entities/user.entity'; // Import User entity

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(User) // Inject UserRepository
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { ownerId, ...projectData } = createProjectDto;
    const owner = await this.userRepository.findOneBy({ id: ownerId });

    if (!owner) {
      throw new NotFoundException(`User with ID ${ownerId} not found`);
    }

    const newProject = this.projectRepository.create({ ...projectData, owner });
    return this.projectRepository.save(newProject);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['owner'] }); // Eager load owner
  }

  async findOne(id: number): Promise<Project | null> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['owner'],
    }); // Eager load owner
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const { ownerId, ...projectData } = updateProjectDto;
    let owner: User | undefined = undefined; // Initialize as undefined

    if (ownerId) {
      const foundOwner = await this.userRepository.findOneBy({ id: ownerId });
      if (!foundOwner) {
        throw new NotFoundException(`User with ID ${ownerId} not found`);
      }
      owner = foundOwner;
    }

    await this.projectRepository.update(id, { ...projectData, owner });
    const updatedProject = await this.projectRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!updatedProject) {
      throw new NotFoundException(
        `Project with ID ${id} not found after update`,
      );
    }
    return updatedProject;
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
  }
}

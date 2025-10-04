import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity'; // Import Project entity
import { CreateProjectDto } from './dto/create-project.dto'; // Will create this DTO
import { UpdateProjectDto } from './dto/update-project.dto'; // Will create this DTO


@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const { ownerId, ...projectData } = createProjectDto;

    const newProject = this.projectRepository.create({ ...projectData, ownerId: String(ownerId) });
    return this.projectRepository.save(newProject);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }


  async findOne(id: number): Promise<Project | null> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });
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
    const updateObject: Partial<Project> = { ...projectData };
    if (ownerId) {
      updateObject.ownerId = String(ownerId);
    }
    await this.projectRepository.update(id, updateObject);
    const updatedProject = await this.projectRepository.findOne({
      where: { id },
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

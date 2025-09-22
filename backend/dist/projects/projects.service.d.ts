import { Repository } from 'typeorm';
import { Project } from '../users/entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from '../users/entities/user.entity';
export declare class ProjectsService {
    private readonly projectRepository;
    private readonly userRepository;
    constructor(projectRepository: Repository<Project>, userRepository: Repository<User>);
    create(createProjectDto: CreateProjectDto): Promise<Project>;
    findAll(): Promise<Project[]>;
    findOne(id: number): Promise<Project | null>;
    update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project>;
    remove(id: number): Promise<void>;
}

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto): Promise<import("../users/entities/project.entity").Project>;
    findAll(): Promise<import("../users/entities/project.entity").Project[]>;
    findOne(id: string): Promise<import("../users/entities/project.entity").Project | null>;
    update(id: string, updateProjectDto: UpdateProjectDto): Promise<import("../users/entities/project.entity").Project>;
    remove(id: string): Promise<void>;
}

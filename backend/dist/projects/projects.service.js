"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_1 = require("../users/entities/project.entity");
const user_entity_1 = require("../users/entities/user.entity");
let ProjectsService = class ProjectsService {
    projectRepository;
    userRepository;
    constructor(projectRepository, userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }
    async create(createProjectDto) {
        const { ownerId, ...projectData } = createProjectDto;
        const owner = await this.userRepository.findOneBy({ id: ownerId });
        if (!owner) {
            throw new common_1.NotFoundException(`User with ID ${ownerId} not found`);
        }
        const newProject = this.projectRepository.create({ ...projectData, owner });
        return this.projectRepository.save(newProject);
    }
    async findAll() {
        return this.projectRepository.find({ relations: ['owner'] });
    }
    async findOne(id) {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
        return project;
    }
    async update(id, updateProjectDto) {
        const { ownerId, ...projectData } = updateProjectDto;
        let owner = undefined;
        if (ownerId) {
            const foundOwner = await this.userRepository.findOneBy({ id: ownerId });
            if (!foundOwner) {
                throw new common_1.NotFoundException(`User with ID ${ownerId} not found`);
            }
            owner = foundOwner;
        }
        await this.projectRepository.update(id, { ...projectData, owner });
        const updatedProject = await this.projectRepository.findOne({
            where: { id },
            relations: ['owner'],
        });
        if (!updatedProject) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found after update`);
        }
        return updatedProject;
    }
    async remove(id) {
        const result = await this.projectRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Project with ID ${id} not found`);
        }
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map
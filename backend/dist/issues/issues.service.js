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
exports.IssuesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const issue_entity_1 = require("./entities/issue.entity");
const project_entity_1 = require("../projects/entities/project.entity");
const users_service_1 = require("../users/users.service");
let IssuesService = class IssuesService {
    issueRepository;
    projectRepository;
    usersService;
    constructor(issueRepository, projectRepository, usersService) {
        this.issueRepository = issueRepository;
        this.projectRepository = projectRepository;
        this.usersService = usersService;
    }
    async create(createIssueDto) {
        const { projectId, assigneeId, managerId, businessOwnerId, ...issueData } = createIssueDto;
        const project = await this.projectRepository.findOne({ where: { id: parseInt(projectId, 10) } });
        if (!project) {
            throw new common_1.NotFoundException(`Project with ID ${projectId} not found`);
        }
        let assignee = null;
        if (assigneeId) {
            assignee = await this.usersService.findOneByLoginId(assigneeId);
            if (!assignee) {
                throw new common_1.NotFoundException(`Assignee with ID ${assigneeId} not found`);
            }
        }
        let manager = null;
        if (managerId) {
            manager = await this.usersService.findOneByLoginId(managerId);
            if (!manager) {
                throw new common_1.NotFoundException(`Manager with ID ${managerId} not found`);
            }
        }
        let businessOwner = null;
        if (businessOwnerId) {
            businessOwner = await this.usersService.findOneByLoginId(businessOwnerId);
            if (!businessOwner) {
                throw new common_1.NotFoundException(`Business Owner with ID ${businessOwnerId} not found`);
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
    async findAll() {
        return this.issueRepository.find({ relations: ['project', 'assignee', 'manager', 'businessOwner'] });
    }
    async findOne(id) {
        const issue = await this.issueRepository.findOne({
            where: { id },
            relations: ['project', 'assignee', 'manager', 'businessOwner'],
        });
        if (!issue) {
            throw new common_1.NotFoundException(`Issue with ID "${id}" not found`);
        }
        return issue;
    }
    async update(id, updateIssueDto) {
        const issue = await this.findOne(id);
        if (!issue) {
            throw new common_1.NotFoundException(`Issue with ID "${id}" not found`);
        }
        const { projectId, assigneeId, managerId, businessOwnerId, ...restOfDto } = updateIssueDto;
        const updateObject = { ...restOfDto };
        if (projectId) {
            const project = await this.projectRepository.findOne({ where: { id: parseInt(projectId, 10) } });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID ${projectId} not found`);
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
            throw new common_1.NotFoundException(`Issue with ID "${id}" not found after update`);
        }
        return updatedIssue;
    }
};
exports.IssuesService = IssuesService;
exports.IssuesService = IssuesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(issue_entity_1.Issue)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        users_service_1.UsersService])
], IssuesService);
//# sourceMappingURL=issues.service.js.map
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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const project_entity_1 = require("../projects/entities/project.entity");
const issue_entity_1 = require("../issues/entities/issue.entity");
const time_log_entity_1 = require("../users/entities/time-log.entity");
const instance_code_entity_1 = require("../entities/instance-code.entity");
let DashboardService = class DashboardService {
    userRepository;
    projectRepository;
    issueRepository;
    timeLogRepository;
    instanceCodeRepository;
    constructor(userRepository, projectRepository, issueRepository, timeLogRepository, instanceCodeRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.issueRepository = issueRepository;
        this.timeLogRepository = timeLogRepository;
        this.instanceCodeRepository = instanceCodeRepository;
    }
    async getStats() {
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.Project)),
    __param(2, (0, typeorm_1.InjectRepository)(issue_entity_1.Issue)),
    __param(3, (0, typeorm_1.InjectRepository)(time_log_entity_1.TimeLog)),
    __param(4, (0, typeorm_1.InjectRepository)(instance_code_entity_1.InstanceCode)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map
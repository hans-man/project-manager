"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/entities/user.entity");
const project_entity_1 = require("./projects/entities/project.entity");
const task_entity_1 = require("./users/entities/task.entity");
const wiki_page_entity_1 = require("./users/entities/wiki-page.entity");
const time_log_entity_1 = require("./users/entities/time-log.entity");
const cost_entry_entity_1 = require("./users/entities/cost-entry.entity");
const issue_entity_1 = require("./issues/entities/issue.entity");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const issues_module_1 = require("./issues/issues.module");
const wikis_module_1 = require("./wikis/wikis.module");
const timelogs_module_1 = require("./timelogs/timelogs.module");
const costentries_module_1 = require("./costentries/costentries.module");
const projects_module_1 = require("./projects/projects.module");
const audit_subscriber_1 = require("./common/subscribers/audit.subscriber");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'Hans0209!!',
                database: 'project_manager_db',
                entities: [user_entity_1.User, project_entity_1.Project, task_entity_1.Task, wiki_page_entity_1.WikiPage, time_log_entity_1.TimeLog, cost_entry_entity_1.CostEntry, issue_entity_1.Issue],
                synchronize: true,
                subscribers: [audit_subscriber_1.AuditSubscriber],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            issues_module_1.IssuesModule,
            wikis_module_1.WikisModule,
            timelogs_module_1.TimelogsModule,
            costentries_module_1.CostentriesModule,
            projects_module_1.ProjectsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
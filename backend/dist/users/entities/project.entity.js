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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const issue_entity_1 = require("../../issues/entities/issue.entity");
const time_log_entity_1 = require("./time-log.entity");
const cost_entry_entity_1 = require("./cost-entry.entity");
const wiki_page_entity_1 = require("./wiki-page.entity");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("../../common/entities/base.entity");
let Project = class Project extends base_entity_1.BaseEntity {
    name;
    description;
    budget;
    issues;
    timeLogs;
    costEntries;
    wikiPages;
    tasks;
    owner;
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Project.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => issue_entity_1.Issue, (issue) => issue.project),
    __metadata("design:type", Array)
], Project.prototype, "issues", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => time_log_entity_1.TimeLog, (timeLog) => timeLog.project),
    __metadata("design:type", Array)
], Project.prototype, "timeLogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cost_entry_entity_1.CostEntry, (costEntry) => costEntry.project),
    __metadata("design:type", Array)
], Project.prototype, "costEntries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => wiki_page_entity_1.WikiPage, (wikiPage) => wikiPage.project),
    __metadata("design:type", Array)
], Project.prototype, "wikiPages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => task_entity_1.Task, (task) => task.project),
    __metadata("design:type", Array)
], Project.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.projects),
    __metadata("design:type", user_entity_1.User)
], Project.prototype, "owner", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)()
], Project);
//# sourceMappingURL=project.entity.js.map
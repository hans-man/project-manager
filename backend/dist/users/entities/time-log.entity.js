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
exports.TimeLog = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./task.entity");
const user_entity_1 = require("./user.entity");
const project_entity_1 = require("../../projects/entities/project.entity");
const base_entity_1 = require("../../common/entities/base.entity");
let TimeLog = class TimeLog extends base_entity_1.BaseEntity {
    hours;
    date;
    task;
    user;
    project;
};
exports.TimeLog = TimeLog;
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], TimeLog.prototype, "hours", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], TimeLog.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_entity_1.Task, (task) => task.timeLogs),
    __metadata("design:type", task_entity_1.Task)
], TimeLog.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.timeLogs, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], TimeLog.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.timeLogs),
    __metadata("design:type", project_entity_1.Project)
], TimeLog.prototype, "project", void 0);
exports.TimeLog = TimeLog = __decorate([
    (0, typeorm_1.Entity)({ name: 'time_logs' })
], TimeLog);
//# sourceMappingURL=time-log.entity.js.map
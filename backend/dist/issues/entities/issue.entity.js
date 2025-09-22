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
exports.Issue = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../../users/entities/project.entity");
const base_entity_1 = require("../../common/entities/base.entity");
let Issue = class Issue extends base_entity_1.BaseEntity {
    title;
    description;
    taskName;
    testClassification;
    testRound;
    programId;
    programName;
    programDescription;
    assigneeName;
    developmentDueDate;
    developmentCompletionDate;
    status;
    managerName;
    managerReviewCompletionDate;
    businessOwnerName;
    businessOwnerReviewCompletionDate;
    project;
};
exports.Issue = Issue;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Issue.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Issue.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Issue.prototype, "taskName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Issue.prototype, "testClassification", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], Issue.prototype, "testRound", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Issue.prototype, "programId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Issue.prototype, "programName", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Issue.prototype, "programDescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Issue.prototype, "assigneeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Issue.prototype, "developmentDueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Issue.prototype, "developmentCompletionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Issue.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Issue.prototype, "managerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Issue.prototype, "managerReviewCompletionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Issue.prototype, "businessOwnerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Issue.prototype, "businessOwnerReviewCompletionDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project, (project) => project.issues),
    __metadata("design:type", project_entity_1.Project)
], Issue.prototype, "project", void 0);
exports.Issue = Issue = __decorate([
    (0, typeorm_1.Entity)()
], Issue);
//# sourceMappingURL=issue.entity.js.map
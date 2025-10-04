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
exports.ProgramColumnName = void 0;
const typeorm_1 = require("typeorm");
const project_entity_1 = require("../projects/entities/project.entity");
const base_entity_1 = require("../common/entities/base.entity");
let ProgramColumnName = class ProgramColumnName extends base_entity_1.BaseEntity {
    projectId;
    columnId;
    columnName;
    tableConfig;
    project;
};
exports.ProgramColumnName = ProgramColumnName;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ProgramColumnName.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], ProgramColumnName.prototype, "columnId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProgramColumnName.prototype, "columnName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'json' }),
    __metadata("design:type", Object)
], ProgramColumnName.prototype, "tableConfig", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_1.Project),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_1.Project)
], ProgramColumnName.prototype, "project", void 0);
exports.ProgramColumnName = ProgramColumnName = __decorate([
    (0, typeorm_1.Entity)({ name: 'program_column_name' })
], ProgramColumnName);
//# sourceMappingURL=program-column-name.entity.js.map
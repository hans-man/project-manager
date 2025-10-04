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
exports.ProgramColumnNameController = void 0;
const common_1 = require("@nestjs/common");
const program_column_name_service_1 = require("./program-column-name.service");
const create_program_column_name_dto_1 = require("./dto/create-program-column-name.dto");
const update_program_column_name_dto_1 = require("./dto/update-program-column-name.dto");
let ProgramColumnNameController = class ProgramColumnNameController {
    programColumnNameService;
    constructor(programColumnNameService) {
        this.programColumnNameService = programColumnNameService;
    }
    create(createProgramColumnNameDto) {
        return this.programColumnNameService.create(createProgramColumnNameDto);
    }
    findAll() {
        return this.programColumnNameService.findAll();
    }
    findOne(projectId, columnId) {
        return this.programColumnNameService.findOne(+projectId, columnId);
    }
    update(projectId, columnId, updateProgramColumnNameDto) {
        return this.programColumnNameService.update(+projectId, columnId, updateProgramColumnNameDto);
    }
    remove(projectId, columnId) {
        return this.programColumnNameService.remove(+projectId, columnId);
    }
};
exports.ProgramColumnNameController = ProgramColumnNameController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_program_column_name_dto_1.CreateProgramColumnNameDto]),
    __metadata("design:returntype", void 0)
], ProgramColumnNameController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProgramColumnNameController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':projectId/:columnId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('columnId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProgramColumnNameController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':projectId/:columnId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('columnId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_program_column_name_dto_1.UpdateProgramColumnNameDto]),
    __metadata("design:returntype", void 0)
], ProgramColumnNameController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':projectId/:columnId'),
    __param(0, (0, common_1.Param)('projectId')),
    __param(1, (0, common_1.Param)('columnId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ProgramColumnNameController.prototype, "remove", null);
exports.ProgramColumnNameController = ProgramColumnNameController = __decorate([
    (0, common_1.Controller)('program-column-name'),
    __metadata("design:paramtypes", [program_column_name_service_1.ProgramColumnNameService])
], ProgramColumnNameController);
//# sourceMappingURL=program-column-name.controller.js.map
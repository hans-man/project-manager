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
exports.ProgramListController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const program_list_service_1 = require("./program-list.service");
const create_program_list_dto_1 = require("./dto/create-program-list.dto");
const update_program_list_dto_1 = require("./dto/update-program-list.dto");
let ProgramListController = class ProgramListController {
    programListService;
    constructor(programListService) {
        this.programListService = programListService;
    }
    create(createProgramListDto) {
        return this.programListService.create(createProgramListDto);
    }
    findAll() {
        return this.programListService.findAll();
    }
    findOne(id) {
        return this.programListService.findOne(+id);
    }
    update(id, updateProgramListDto) {
        return this.programListService.update(+id, updateProgramListDto);
    }
    remove(id) {
        return this.programListService.remove(+id);
    }
    async bulkUpload(file, res) {
        if (!file || file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: '엑셀 파일만 업로드할 수 있습니다.' });
        }
        try {
            const result = await this.programListService.bulkUpload(file.buffer);
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '파일 처리 중 오류가 발생했습니다.', error: error.message });
        }
    }
    async downloadTemplate(res) {
        try {
            const excelBuffer = this.programListService.generateExcelTemplate();
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="program_list_template.xlsx"',
            });
            res.send(excelBuffer);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '템플릿 생성 중 오류가 발생했습니다.', error: error.message });
        }
    }
};
exports.ProgramListController = ProgramListController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_program_list_dto_1.CreateProgramListDto]),
    __metadata("design:returntype", void 0)
], ProgramListController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProgramListController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProgramListController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_program_list_dto_1.UpdateProgramListDto]),
    __metadata("design:returntype", void 0)
], ProgramListController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProgramListController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProgramListController.prototype, "bulkUpload", null);
__decorate([
    (0, common_1.Get)('template'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProgramListController.prototype, "downloadTemplate", null);
exports.ProgramListController = ProgramListController = __decorate([
    (0, common_1.Controller)('program-list'),
    __metadata("design:paramtypes", [program_list_service_1.ProgramListService])
], ProgramListController);
//# sourceMappingURL=program-list.controller.js.map
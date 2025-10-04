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
exports.InstanceCodesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const instance_codes_service_1 = require("./instance-codes.service");
const create_instance_code_dto_1 = require("./dto/create-instance-code.dto");
const update_instance_code_dto_1 = require("./dto/update-instance-code.dto");
let InstanceCodesController = class InstanceCodesController {
    instanceCodesService;
    constructor(instanceCodesService) {
        this.instanceCodesService = instanceCodesService;
    }
    create(createInstanceCodeDto) {
        return this.instanceCodesService.create(createInstanceCodeDto);
    }
    findAll() {
        return this.instanceCodesService.findAll();
    }
    findOne(instanceIdentifier, instanceCode) {
        return this.instanceCodesService.findOne(instanceIdentifier, instanceCode);
    }
    update(instanceIdentifier, instanceCode, updateInstanceCodeDto) {
        return this.instanceCodesService.update(instanceIdentifier, instanceCode, updateInstanceCodeDto);
    }
    remove(instanceIdentifier, instanceCode) {
        return this.instanceCodesService.remove(instanceIdentifier, instanceCode);
    }
    async bulkUpload(file, res) {
        if (!file || file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: '엑셀 파일만 업로드할 수 있습니다.' });
        }
        try {
            const result = await this.instanceCodesService.bulkUpload(file.buffer);
            return res.status(common_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '파일 처리 중 오류가 발생했습니다.', error: error.message });
        }
    }
    async downloadTemplate(res) {
        try {
            const excelBuffer = this.instanceCodesService.generateExcelTemplate();
            res.set({
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="instance_code_template.xlsx"',
            });
            res.send(excelBuffer);
        }
        catch (error) {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: '템플릿 생성 중 오류가 발생했습니다.', error: error.message });
        }
    }
};
exports.InstanceCodesController = InstanceCodesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_instance_code_dto_1.CreateInstanceCodeDto]),
    __metadata("design:returntype", void 0)
], InstanceCodesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InstanceCodesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':instanceIdentifier/:instanceCode'),
    __param(0, (0, common_1.Param)('instanceIdentifier')),
    __param(1, (0, common_1.Param)('instanceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InstanceCodesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':instanceIdentifier/:instanceCode'),
    __param(0, (0, common_1.Param)('instanceIdentifier')),
    __param(1, (0, common_1.Param)('instanceCode')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_instance_code_dto_1.UpdateInstanceCodeDto]),
    __metadata("design:returntype", void 0)
], InstanceCodesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':instanceIdentifier/:instanceCode'),
    __param(0, (0, common_1.Param)('instanceIdentifier')),
    __param(1, (0, common_1.Param)('instanceCode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], InstanceCodesController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('bulk-upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], InstanceCodesController.prototype, "bulkUpload", null);
__decorate([
    (0, common_1.Get)('template'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InstanceCodesController.prototype, "downloadTemplate", null);
exports.InstanceCodesController = InstanceCodesController = __decorate([
    (0, common_1.Controller)('instance-codes'),
    __metadata("design:paramtypes", [instance_codes_service_1.InstanceCodesService])
], InstanceCodesController);
//# sourceMappingURL=instance-codes.controller.js.map
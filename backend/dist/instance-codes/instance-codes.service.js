"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceCodesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const instance_code_entity_1 = require("../entities/instance-code.entity");
const create_instance_code_dto_1 = require("./dto/create-instance-code.dto");
const XLSX = __importStar(require("xlsx"));
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let InstanceCodesService = class InstanceCodesService {
    instanceCodeRepository;
    constructor(instanceCodeRepository) {
        this.instanceCodeRepository = instanceCodeRepository;
    }
    async create(createInstanceCodeDto) {
        const instanceCode = this.instanceCodeRepository.create(createInstanceCodeDto);
        return this.instanceCodeRepository.save(instanceCode);
    }
    async findAll() {
        return this.instanceCodeRepository.find();
    }
    async findOne(instanceIdentifier, instanceCode) {
        const instanceCodeEntity = await this.instanceCodeRepository.findOne({ where: { instanceIdentifier, instanceCode } });
        if (!instanceCodeEntity) {
            throw new common_1.NotFoundException(`InstanceCode with identifier ${instanceIdentifier} and code ${instanceCode} not found`);
        }
        return instanceCodeEntity;
    }
    async update(instanceIdentifier, instanceCode, updateInstanceCodeDto) {
        const instanceCodeEntity = await this.instanceCodeRepository.findOne({ where: { instanceIdentifier, instanceCode } });
        if (!instanceCodeEntity) {
            throw new common_1.NotFoundException(`InstanceCode with identifier ${instanceIdentifier} and code ${instanceCode} not found`);
        }
        Object.assign(instanceCodeEntity, updateInstanceCodeDto);
        return this.instanceCodeRepository.save(instanceCodeEntity);
    }
    async remove(instanceIdentifier, instanceCode) {
        const result = await this.instanceCodeRepository.delete({ instanceIdentifier, instanceCode });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`InstanceCode with identifier ${instanceIdentifier} and code ${instanceCode} not found`);
        }
    }
    async bulkUpload(fileBuffer) {
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rawData = XLSX.utils.sheet_to_json(worksheet);
        const results = {
            success: [],
            failed: [],
        };
        for (const row of rawData) {
            const createDto = (0, class_transformer_1.plainToClass)(create_instance_code_dto_1.CreateInstanceCodeDto, {
                instanceIdentifier: row['인스턴스식별자'],
                instanceIdentifierName: row['인스턴스식별자명'],
                instanceCode: row['인스턴스코드'],
                instanceCodeName: row['인스턴스코드명'],
                queryOrder: row['조회순서'],
                description: row['설명'],
            });
            const errors = await (0, class_validator_1.validate)(createDto);
            if (errors.length > 0) {
                results.failed.push({
                    data: row,
                    errors: errors.map(err => err.constraints ? Object.values(err.constraints) : []).flat(),
                });
                continue;
            }
            try {
                const existing = await this.instanceCodeRepository.findOne({
                    where: { instanceIdentifier: createDto.instanceIdentifier, instanceCode: createDto.instanceCode },
                });
                if (existing) {
                    await this.instanceCodeRepository.update({ instanceIdentifier: createDto.instanceIdentifier, instanceCode: createDto.instanceCode }, createDto);
                    results.success.push({ data: createDto, status: 'updated' });
                }
                else {
                    const instanceCode = this.instanceCodeRepository.create(createDto);
                    await this.instanceCodeRepository.save(instanceCode);
                    results.success.push({ data: createDto, status: 'created' });
                }
            }
            catch (dbError) {
                results.failed.push({
                    data: row,
                    errors: [dbError.message || '데이터베이스 저장 오류'],
                });
            }
        }
        return results;
    }
    generateExcelTemplate() {
        const headers = [
            '인스턴스식별자',
            '인스턴스식별자명',
            '인스턴스코드',
            '인스턴스코드명',
            '조회순서',
            '설명',
        ];
        const worksheet = XLSX.utils.aoa_to_sheet([headers]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'InstanceCodes');
        return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    }
};
exports.InstanceCodesService = InstanceCodesService;
exports.InstanceCodesService = InstanceCodesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(instance_code_entity_1.InstanceCode)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], InstanceCodesService);
//# sourceMappingURL=instance-codes.service.js.map
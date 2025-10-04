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
exports.ProgramListService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const program_list_entity_1 = require("../entities/program-list.entity");
const create_program_list_dto_1 = require("./dto/create-program-list.dto");
const XLSX = __importStar(require("xlsx"));
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let ProgramListService = class ProgramListService {
    programListRepository;
    constructor(programListRepository) {
        this.programListRepository = programListRepository;
    }
    async create(createProgramListDto) {
        const programList = this.programListRepository.create(createProgramListDto);
        return this.programListRepository.save(programList);
    }
    async findAll() {
        return this.programListRepository.find();
    }
    async findOne(id) {
        const programList = await this.programListRepository.findOneBy({ id });
        if (!programList) {
            throw new common_1.NotFoundException(`ProgramList with ID ${id} not found`);
        }
        return programList;
    }
    async update(id, updateProgramListDto) {
        const programList = await this.findOne(id);
        Object.assign(programList, updateProgramListDto);
        return this.programListRepository.save(programList);
    }
    async remove(id) {
        const programList = await this.findOne(id);
        await this.programListRepository.remove(programList);
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
            const createDto = (0, class_transformer_1.plainToClass)(create_program_list_dto_1.CreateProgramListDto, {
                ...Object.fromEntries(Array.from({ length: 60 }, (_, i) => [
                    `column${i + 1}`,
                    row[`컬럼${i + 1}`] !== undefined ? row[`컬럼${i + 1}`] : null,
                ])),
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
                const programList = this.programListRepository.create(createDto);
                await this.programListRepository.save(programList);
                results.success.push({ data: createDto, status: 'created' });
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
        const headers = Array.from({ length: 60 }, (_, i) => `컬럼${i + 1}`);
        const worksheet = XLSX.utils.aoa_to_sheet([headers]);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ProgramList');
        return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    }
};
exports.ProgramListService = ProgramListService;
exports.ProgramListService = ProgramListService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(program_list_entity_1.ProgramList)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProgramListService);
//# sourceMappingURL=program-list.service.js.map
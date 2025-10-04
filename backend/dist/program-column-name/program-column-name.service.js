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
exports.ProgramColumnNameService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const program_column_name_entity_1 = require("../entities/program-column-name.entity");
let ProgramColumnNameService = class ProgramColumnNameService {
    programColumnNameRepository;
    constructor(programColumnNameRepository) {
        this.programColumnNameRepository = programColumnNameRepository;
    }
    async create(createProgramColumnNameDto) {
        const programColumnName = this.programColumnNameRepository.create(createProgramColumnNameDto);
        return this.programColumnNameRepository.save(programColumnName);
    }
    async findAll() {
        return this.programColumnNameRepository.find();
    }
    async findOne(projectId, columnId) {
        const programColumnName = await this.programColumnNameRepository.findOne({ where: { projectId, columnId } });
        if (!programColumnName) {
            throw new common_1.NotFoundException(`ProgramColumnName with Project ID ${projectId} and Column ID ${columnId} not found`);
        }
        return programColumnName;
    }
    async update(projectId, columnId, updateProgramColumnNameDto) {
        const programColumnName = await this.findOne(projectId, columnId);
        Object.assign(programColumnName, updateProgramColumnNameDto);
        return this.programColumnNameRepository.save(programColumnName);
    }
    async remove(projectId, columnId) {
        const programColumnName = await this.findOne(projectId, columnId);
        await this.programColumnNameRepository.remove(programColumnName);
    }
};
exports.ProgramColumnNameService = ProgramColumnNameService;
exports.ProgramColumnNameService = ProgramColumnNameService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(program_column_name_entity_1.ProgramColumnName)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProgramColumnNameService);
//# sourceMappingURL=program-column-name.service.js.map
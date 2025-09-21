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
exports.CostentriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cost_entry_entity_1 = require("../users/entities/cost-entry.entity");
let CostentriesService = class CostentriesService {
    costEntryRepository;
    constructor(costEntryRepository) {
        this.costEntryRepository = costEntryRepository;
    }
    async create(createCostEntryDto) {
        const { amount, date, description, taskId, userId } = createCostEntryDto;
        const newCostEntry = this.costEntryRepository.create({
            amount,
            date,
            description,
            task: { id: taskId },
            user: { id: userId },
        });
        return this.costEntryRepository.save(newCostEntry);
    }
    async findAll() {
        return this.costEntryRepository.find();
    }
    async findOne(id) {
        return this.costEntryRepository.findOneBy({ id });
    }
    async update(id, updateCostEntryDto) {
        await this.costEntryRepository.update(id, updateCostEntryDto);
        return this.findOne(id);
    }
    async remove(id) {
        await this.costEntryRepository.delete(id);
    }
};
exports.CostentriesService = CostentriesService;
exports.CostentriesService = CostentriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cost_entry_entity_1.CostEntry)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CostentriesService);
//# sourceMappingURL=costentries.service.js.map
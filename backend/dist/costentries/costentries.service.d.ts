import { Repository } from 'typeorm';
import { CostEntry } from '../users/entities/cost-entry.entity';
import { CreateCostEntryDto } from './dto/create-cost-entry.dto';
import { UpdateCostEntryDto } from './dto/update-cost-entry.dto';
export declare class CostentriesService {
    private readonly costEntryRepository;
    constructor(costEntryRepository: Repository<CostEntry>);
    create(createCostEntryDto: CreateCostEntryDto): Promise<CostEntry>;
    findAll(): Promise<CostEntry[]>;
    findOne(id: number): Promise<CostEntry | null>;
    update(id: number, updateCostEntryDto: UpdateCostEntryDto): Promise<CostEntry | null>;
    remove(id: number): Promise<void>;
}

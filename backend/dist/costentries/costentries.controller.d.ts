import { CostentriesService } from './costentries.service';
import { CreateCostEntryDto } from './dto/create-cost-entry.dto';
import { UpdateCostEntryDto } from './dto/update-cost-entry.dto';
export declare class CostentriesController {
    private readonly costentriesService;
    constructor(costentriesService: CostentriesService);
    create(createCostEntryDto: CreateCostEntryDto): Promise<import("../users/entities/cost-entry.entity").CostEntry>;
    findAll(): Promise<import("../users/entities/cost-entry.entity").CostEntry[]>;
    findOne(id: string): Promise<import("../users/entities/cost-entry.entity").CostEntry | null>;
    update(id: string, updateCostEntryDto: UpdateCostEntryDto): Promise<import("../users/entities/cost-entry.entity").CostEntry | null>;
    remove(id: string): Promise<void>;
}

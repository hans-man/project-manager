import { ProgramColumnNameService } from './program-column-name.service';
import { CreateProgramColumnNameDto } from './dto/create-program-column-name.dto';
import { UpdateProgramColumnNameDto } from './dto/update-program-column-name.dto';
export declare class ProgramColumnNameController {
    private readonly programColumnNameService;
    constructor(programColumnNameService: ProgramColumnNameService);
    create(createProgramColumnNameDto: CreateProgramColumnNameDto): Promise<import("../entities/program-column-name.entity").ProgramColumnName>;
    findAll(): Promise<import("../entities/program-column-name.entity").ProgramColumnName[]>;
    findOne(projectId: string, columnId: string): Promise<import("../entities/program-column-name.entity").ProgramColumnName>;
    update(projectId: string, columnId: string, updateProgramColumnNameDto: UpdateProgramColumnNameDto): Promise<import("../entities/program-column-name.entity").ProgramColumnName>;
    remove(projectId: string, columnId: string): Promise<void>;
}

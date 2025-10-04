import { Repository } from 'typeorm';
import { ProgramColumnName } from '../entities/program-column-name.entity';
import { CreateProgramColumnNameDto } from './dto/create-program-column-name.dto';
import { UpdateProgramColumnNameDto } from './dto/update-program-column-name.dto';
export declare class ProgramColumnNameService {
    private readonly programColumnNameRepository;
    constructor(programColumnNameRepository: Repository<ProgramColumnName>);
    create(createProgramColumnNameDto: CreateProgramColumnNameDto): Promise<ProgramColumnName>;
    findAll(): Promise<ProgramColumnName[]>;
    findOne(projectId: number, columnId: string): Promise<ProgramColumnName>;
    update(projectId: number, columnId: string, updateProgramColumnNameDto: UpdateProgramColumnNameDto): Promise<ProgramColumnName>;
    remove(projectId: number, columnId: string): Promise<void>;
}

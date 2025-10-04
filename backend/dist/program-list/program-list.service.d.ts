import { Repository } from 'typeorm';
import { ProgramList } from '../entities/program-list.entity';
import { CreateProgramListDto } from './dto/create-program-list.dto';
import { UpdateProgramListDto } from './dto/update-program-list.dto';
export declare class ProgramListService {
    private readonly programListRepository;
    constructor(programListRepository: Repository<ProgramList>);
    create(createProgramListDto: CreateProgramListDto): Promise<ProgramList>;
    findAll(): Promise<ProgramList[]>;
    findOne(id: number): Promise<ProgramList>;
    update(id: number, updateProgramListDto: UpdateProgramListDto): Promise<ProgramList>;
    remove(id: number): Promise<void>;
    bulkUpload(fileBuffer: Buffer): Promise<{
        success: {
            data: CreateProgramListDto;
            status: string;
        }[];
        failed: {
            data: any;
            errors: string[];
        }[];
    }>;
    generateExcelTemplate(): Buffer;
}

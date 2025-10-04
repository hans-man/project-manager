import type { Response } from 'express';
import { ProgramListService } from './program-list.service';
import { CreateProgramListDto } from './dto/create-program-list.dto';
import { UpdateProgramListDto } from './dto/update-program-list.dto';
export declare class ProgramListController {
    private readonly programListService;
    constructor(programListService: ProgramListService);
    create(createProgramListDto: CreateProgramListDto): Promise<import("../entities/program-list.entity").ProgramList>;
    findAll(): Promise<import("../entities/program-list.entity").ProgramList[]>;
    findOne(id: string): Promise<import("../entities/program-list.entity").ProgramList>;
    update(id: string, updateProgramListDto: UpdateProgramListDto): Promise<import("../entities/program-list.entity").ProgramList>;
    remove(id: string): Promise<void>;
    bulkUpload(file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    downloadTemplate(res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}

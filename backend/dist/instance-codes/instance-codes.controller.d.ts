import type { Response } from 'express';
import { InstanceCodesService } from './instance-codes.service';
import { CreateInstanceCodeDto } from './dto/create-instance-code.dto';
import { UpdateInstanceCodeDto } from './dto/update-instance-code.dto';
export declare class InstanceCodesController {
    private readonly instanceCodesService;
    constructor(instanceCodesService: InstanceCodesService);
    create(createInstanceCodeDto: CreateInstanceCodeDto): Promise<import("../entities/instance-code.entity").InstanceCode>;
    findAll(): Promise<import("../entities/instance-code.entity").InstanceCode[]>;
    findOne(instanceIdentifier: string, instanceCode: string): Promise<import("../entities/instance-code.entity").InstanceCode | undefined>;
    update(instanceIdentifier: string, instanceCode: string, updateInstanceCodeDto: UpdateInstanceCodeDto): Promise<import("../entities/instance-code.entity").InstanceCode>;
    remove(instanceIdentifier: string, instanceCode: string): Promise<void>;
    bulkUpload(file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    downloadTemplate(res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}

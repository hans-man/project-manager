import { Repository } from 'typeorm';
import { InstanceCode } from '../entities/instance-code.entity';
import { CreateInstanceCodeDto } from './dto/create-instance-code.dto';
import { UpdateInstanceCodeDto } from './dto/update-instance-code.dto';
export declare class InstanceCodesService {
    private readonly instanceCodeRepository;
    constructor(instanceCodeRepository: Repository<InstanceCode>);
    create(createInstanceCodeDto: CreateInstanceCodeDto): Promise<InstanceCode>;
    findAll(): Promise<InstanceCode[]>;
    findOne(instanceIdentifier: string, instanceCode: string): Promise<InstanceCode | undefined>;
    update(instanceIdentifier: string, instanceCode: string, updateInstanceCodeDto: UpdateInstanceCodeDto): Promise<InstanceCode>;
    remove(instanceIdentifier: string, instanceCode: string): Promise<void>;
    bulkUpload(fileBuffer: Buffer): Promise<{
        success: {
            data: CreateInstanceCodeDto;
            status: string;
        }[];
        failed: {
            data: any;
            errors: string[];
        }[];
    }>;
    generateExcelTemplate(): Buffer;
}

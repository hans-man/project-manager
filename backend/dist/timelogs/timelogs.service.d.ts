import { Repository } from 'typeorm';
import { TimeLog } from '../users/entities/time-log.entity';
import { CreateTimeLogDto } from './dto/create-time-log.dto';
import { UpdateTimeLogDto } from './dto/update-time-log.dto';
export declare class TimelogsService {
    private readonly timeLogRepository;
    constructor(timeLogRepository: Repository<TimeLog>);
    create(createTimeLogDto: CreateTimeLogDto): Promise<TimeLog>;
    findAll(): Promise<TimeLog[]>;
    findOne(id: number): Promise<TimeLog | null>;
    update(id: number, updateTimeLogDto: UpdateTimeLogDto): Promise<TimeLog>;
    remove(id: number): Promise<void>;
}

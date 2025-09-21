import { TimelogsService } from './timelogs.service';
import { CreateTimeLogDto } from './dto/create-time-log.dto';
import { UpdateTimeLogDto } from './dto/update-time-log.dto';
export declare class TimelogsController {
    private readonly timelogsService;
    constructor(timelogsService: TimelogsService);
    create(createTimeLogDto: CreateTimeLogDto): Promise<import("../users/entities/time-log.entity").TimeLog>;
    findAll(): Promise<import("../users/entities/time-log.entity").TimeLog[]>;
    findOne(id: string): Promise<import("../users/entities/time-log.entity").TimeLog | null>;
    update(id: string, updateTimeLogDto: UpdateTimeLogDto): Promise<import("../users/entities/time-log.entity").TimeLog>;
    remove(id: string): Promise<void>;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TimeLog } from '../users/entities/time-log.entity';
import { CreateTimeLogDto } from './dto/create-time-log.dto';
import { UpdateTimeLogDto } from './dto/update-time-log.dto';

@Injectable()
export class TimelogsService {
  constructor(
    @InjectRepository(TimeLog)
    private readonly timeLogRepository: Repository<TimeLog>,
  ) {}

  async create(createTimeLogDto: CreateTimeLogDto): Promise<TimeLog> {
    const { hours, date, taskId, userId } = createTimeLogDto;

    // In a real application, you would fetch the task and user entities
    // For now, we'll just assign the IDs
    const newTimeLog = this.timeLogRepository.create({
      hours,
      date,
      task: { id: taskId },
      user: { id: userId },
    });

    return this.timeLogRepository.save(newTimeLog);
  }

  async findAll(): Promise<TimeLog[]> {
    return this.timeLogRepository.find();
  }

  async findOne(id: number): Promise<TimeLog | null> {
    return this.timeLogRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateTimeLogDto: UpdateTimeLogDto,
  ): Promise<TimeLog> {
    await this.timeLogRepository.update(id, updateTimeLogDto);
    const updatedTimeLog = await this.findOne(id);
    if (!updatedTimeLog) {
      throw new NotFoundException(`TimeLog with ID ${id} not found`);
    }
    return updatedTimeLog;
  }

  async remove(id: number): Promise<void> {
    await this.timeLogRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CostEntry } from '../users/entities/cost-entry.entity';
import { CreateCostEntryDto } from './dto/create-cost-entry.dto';
import { UpdateCostEntryDto } from './dto/update-cost-entry.dto';

@Injectable()
export class CostentriesService {
  constructor(
    @InjectRepository(CostEntry)
    private readonly costEntryRepository: Repository<CostEntry>,
  ) {}

  async create(createCostEntryDto: CreateCostEntryDto): Promise<CostEntry> {
    const { amount, date, description, taskId, userId } = createCostEntryDto;

    // In a real application, you would fetch the task and user entities
    // For now, we'll just assign the IDs
    const newCostEntry = this.costEntryRepository.create({
      amount,
      date,
      description,
      task: { id: taskId },
      user: { id: userId },
    });

    return this.costEntryRepository.save(newCostEntry);
  }

  async findAll(): Promise<CostEntry[]> {
    return this.costEntryRepository.find();
  }

  async findOne(id: number): Promise<CostEntry | null> {
    return this.costEntryRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateCostEntryDto: UpdateCostEntryDto,
  ): Promise<CostEntry> {
    await this.costEntryRepository.update(id, updateCostEntryDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.costEntryRepository.delete(id);
  }
}

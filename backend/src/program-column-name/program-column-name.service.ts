import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramColumnName } from '../entities/program-column-name.entity';
import { CreateProgramColumnNameDto } from './dto/create-program-column-name.dto';
import { UpdateProgramColumnNameDto } from './dto/update-program-column-name.dto';

@Injectable()
export class ProgramColumnNameService {
  constructor(
    @InjectRepository(ProgramColumnName)
    private readonly programColumnNameRepository: Repository<ProgramColumnName>,
  ) {}

  async create(createProgramColumnNameDto: CreateProgramColumnNameDto): Promise<ProgramColumnName> {
    const programColumnName = this.programColumnNameRepository.create(createProgramColumnNameDto);
    return this.programColumnNameRepository.save(programColumnName);
  }

  async findAll(): Promise<ProgramColumnName[]> {
    return this.programColumnNameRepository.find();
  }

  async findOne(projectId: number, columnId: string): Promise<ProgramColumnName> {
    const programColumnName = await this.programColumnNameRepository.findOne({ where: { projectId, columnId } });
    if (!programColumnName) {
      throw new NotFoundException(`ProgramColumnName with Project ID ${projectId} and Column ID ${columnId} not found`);
    }
    return programColumnName;
  }

  async update(projectId: number, columnId: string, updateProgramColumnNameDto: UpdateProgramColumnNameDto): Promise<ProgramColumnName> {
    const programColumnName = await this.findOne(projectId, columnId);
    Object.assign(programColumnName, updateProgramColumnNameDto);
    return this.programColumnNameRepository.save(programColumnName);
  }

  async remove(projectId: number, columnId: string): Promise<void> {
    const programColumnName = await this.findOne(projectId, columnId);
    await this.programColumnNameRepository.remove(programColumnName);
  }
}

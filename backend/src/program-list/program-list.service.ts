import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramList } from '../entities/program-list.entity';
import { CreateProgramListDto } from './dto/create-program-list.dto';
import { UpdateProgramListDto } from './dto/update-program-list.dto';
import * as XLSX from 'xlsx';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ProgramListService {
  constructor(
    @InjectRepository(ProgramList)
    private readonly programListRepository: Repository<ProgramList>,
  ) {}

  async create(createProgramListDto: CreateProgramListDto): Promise<ProgramList> {
    const programList = this.programListRepository.create(createProgramListDto);
    return this.programListRepository.save(programList);
  }

  async findAll(): Promise<ProgramList[]> {
    return this.programListRepository.find();
  }

  async findOne(id: number): Promise<ProgramList> {
    const programList = await this.programListRepository.findOneBy({ id });
    if (!programList) {
      throw new NotFoundException(`ProgramList with ID ${id} not found`);
    }
    return programList;
  }

  async update(id: number, updateProgramListDto: UpdateProgramListDto): Promise<ProgramList> {
    const programList = await this.findOne(id);
    Object.assign(programList, updateProgramListDto);
    return this.programListRepository.save(programList);
  }

  async remove(id: number): Promise<void> {
    const programList = await this.findOne(id);
    await this.programListRepository.remove(programList);
  }

  async bulkUpload(fileBuffer: Buffer): Promise<{
    success: { data: CreateProgramListDto; status: string }[];
    failed: { data: any; errors: string[] }[];
  }> {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData: any[] = XLSX.utils.sheet_to_json(worksheet);

    const results: {
      success: { data: CreateProgramListDto; status: string }[];
      failed: { data: any; errors: string[] }[];
    } = {
      success: [],
      failed: [],
    };

    for (const row of rawData) {
      const createDto = plainToClass(CreateProgramListDto, {
        // Map all 60 columns dynamically
        ...Object.fromEntries(Array.from({ length: 60 }, (_, i) => [
          `column${i + 1}`,
          row[`컬럼${i + 1}`] !== undefined ? row[`컬럼${i + 1}`] : null,
        ])),
      });

      const errors = await validate(createDto);

      if (errors.length > 0) {
        results.failed.push({
          data: row,
          errors: errors.map(err => err.constraints ? Object.values(err.constraints) : []).flat(),
        });
        continue;
      }

      try {
        // For simplicity, assuming no unique identifier other than ID for now
        // In a real scenario, you might check for existing entries based on a business key
        const programList = this.programListRepository.create(createDto);
        await this.programListRepository.save(programList);
        results.success.push({ data: createDto, status: 'created' });
      } catch (dbError: any) {
        results.failed.push({
          data: row,
          errors: [dbError.message || '데이터베이스 저장 오류'],
        });
      }
    }

    return results;
  }

  generateExcelTemplate(): Buffer {
    const headers = Array.from({ length: 60 }, (_, i) => `컬럼${i + 1}`);

    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ProgramList');

    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }
}

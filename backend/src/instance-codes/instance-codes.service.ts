import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstanceCode } from '../entities/instance-code.entity';
import { CreateInstanceCodeDto } from './dto/create-instance-code.dto';
import { UpdateInstanceCodeDto } from './dto/update-instance-code.dto';
import * as XLSX from 'xlsx';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class InstanceCodesService {
  constructor(
    @InjectRepository(InstanceCode)
    private readonly instanceCodeRepository: Repository<InstanceCode>,
  ) {}

  async create(createInstanceCodeDto: CreateInstanceCodeDto): Promise<InstanceCode> {
    const instanceCode = this.instanceCodeRepository.create(createInstanceCodeDto);
    return this.instanceCodeRepository.save(instanceCode);
  }

  async findAll(): Promise<InstanceCode[]> {
    return this.instanceCodeRepository.find();
  }

  async findOne(instanceIdentifier: string, instanceCode: string): Promise<InstanceCode | undefined> {
    const instanceCodeEntity = await this.instanceCodeRepository.findOne({ where: { instanceIdentifier, instanceCode } });
    if (!instanceCodeEntity) {
      throw new NotFoundException(`InstanceCode with identifier ${instanceIdentifier} and code ${instanceCode} not found`);
    }
    return instanceCodeEntity;
  }

  async update(instanceIdentifier: string, instanceCode: string, updateInstanceCodeDto: UpdateInstanceCodeDto): Promise<InstanceCode> {
    const instanceCodeEntity = await this.instanceCodeRepository.findOne({ where: { instanceIdentifier, instanceCode } });
    if (!instanceCodeEntity) {
      throw new NotFoundException(`InstanceCode with identifier ${instanceIdentifier} and code ${instanceCode} not found`);
    }
    // Merge the updateDto into the found entity
    Object.assign(instanceCodeEntity, updateInstanceCodeDto);
    return this.instanceCodeRepository.save(instanceCodeEntity);
  }

  async remove(instanceIdentifier: string, instanceCode: string): Promise<void> {
    const result = await this.instanceCodeRepository.delete({ instanceIdentifier, instanceCode });
    if (result.affected === 0) {
      throw new NotFoundException(`InstanceCode with identifier ${instanceIdentifier} and code ${instanceCode} not found`);
    }
  }

  async bulkUpload(fileBuffer: Buffer): Promise<{
    success: { data: CreateInstanceCodeDto; status: string }[];
    failed: { data: any; errors: string[] }[];
  }> {
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const rawData: any[] = XLSX.utils.sheet_to_json(worksheet);

    const results: {
      success: { data: CreateInstanceCodeDto; status: string }[];
      failed: { data: any; errors: string[] }[];
    } = {
      success: [],
      failed: [],
    };

    for (const row of rawData) {
      const createDto = plainToClass(CreateInstanceCodeDto, {
        instanceIdentifier: row['인스턴스식별자'],
        instanceIdentifierName: row['인스턴스식별자명'],
        instanceCode: row['인스턴스코드'],
        instanceCodeName: row['인스턴스코드명'],
        queryOrder: row['조회순서'],
        description: row['설명'],
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
        const existing = await this.instanceCodeRepository.findOne({
          where: { instanceIdentifier: createDto.instanceIdentifier, instanceCode: createDto.instanceCode },
        });

        if (existing) {
          // Update existing entry
          await this.instanceCodeRepository.update(
            { instanceIdentifier: createDto.instanceIdentifier, instanceCode: createDto.instanceCode },
            createDto,
          );
          results.success.push({ data: createDto, status: 'updated' });
        } else {
          // Create new entry
          const instanceCode = this.instanceCodeRepository.create(createDto);
          await this.instanceCodeRepository.save(instanceCode);
          results.success.push({ data: createDto, status: 'created' });
        }
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
    const headers = [
      '인스턴스식별자',
      '인스턴스식별자명',
      '인스턴스코드',
      '인스턴스코드명',
      '조회순서',
      '설명',
    ];

    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'InstanceCodes');

    return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramColumnName } from '../entities/program-column-name.entity.js';
import { ProgramColumnNameService } from './program-column-name.service';
import { ProgramColumnNameController } from './program-column-name.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramColumnName])],
  providers: [ProgramColumnNameService],
  controllers: [ProgramColumnNameController],
})
export class ProgramColumnNameModule {}

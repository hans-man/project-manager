import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramList } from '../entities/program-list.entity';
import { ProgramListService } from './program-list.service';
import { ProgramListController } from './program-list.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramList])],
  providers: [ProgramListService],
  controllers: [ProgramListController],
})
export class ProgramListModule {}

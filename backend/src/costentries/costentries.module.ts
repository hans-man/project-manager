import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostEntry } from '../users/entities/cost-entry.entity';
import { CostentriesService } from './costentries.service';

@Module({
  imports: [TypeOrmModule.forFeature([CostEntry])],
  providers: [CostentriesService],
})
export class CostentriesModule {}

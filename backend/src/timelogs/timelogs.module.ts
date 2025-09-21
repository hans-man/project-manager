import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeLog } from '../users/entities/time-log.entity';
import { TimelogsService } from './timelogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimeLog])],
  providers: [TimelogsService],
})
export class TimelogsModule {}

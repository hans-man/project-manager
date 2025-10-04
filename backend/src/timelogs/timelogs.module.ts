import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeLog } from '../users/entities/time-log.entity';
import { TimelogsService } from './timelogs.service';
import { TimelogsController } from './timelogs.controller'; // Import the controller

@Module({
  imports: [TypeOrmModule.forFeature([TimeLog])],
  controllers: [TimelogsController], // Add the controller
  providers: [TimelogsService],
})
export class TimelogsModule {}

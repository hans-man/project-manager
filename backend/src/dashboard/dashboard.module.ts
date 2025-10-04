import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Issue } from '../issues/entities/issue.entity';
import { TimeLog } from '../users/entities/time-log.entity';

import { InstanceCode } from '../entities/instance-code.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Project,
      Issue,
      TimeLog,
      InstanceCode,
    ]),
  ],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}

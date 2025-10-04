import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { Issue } from './entities/issue.entity';
import { Project } from '../projects/entities/project.entity';

import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Issue, Project]), UsersModule],
  providers: [IssuesService],
  controllers: [IssuesController],
})
export class IssuesModule {}
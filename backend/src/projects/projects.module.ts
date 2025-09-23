import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm'; // Import TypeOrmModule
import { Project } from './entities/project.entity'; // Import Project entity
import { User } from '../users/entities/user.entity'; // Import User entity

@Module({
  imports: [TypeOrmModule.forFeature([Project, User])], // Add TypeOrmModule.forFeature for User
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}

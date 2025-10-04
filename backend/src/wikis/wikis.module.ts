import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WikiPage } from '../users/entities/wiki-page.entity';
import { Project } from '../projects/entities/project.entity'; // Import Project entity
import { User } from '../users/entities/user.entity'; // Import User entity
import { WikisService } from './wikis.service';
import { WikisController } from './wikis.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WikiPage, Project, User])],
  providers: [WikisService],
  controllers: [WikisController],
})
export class WikisModule {}

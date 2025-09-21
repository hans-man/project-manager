import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WikiPage } from '../users/entities/wiki-page.entity';
import { WikisService } from './wikis.service';

@Module({
  imports: [TypeOrmModule.forFeature([WikiPage])],
  providers: [WikisService],
})
export class WikisModule {}

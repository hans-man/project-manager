import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WikiPage } from '../users/entities/wiki-page.entity';
import { CreateWikiPageDto } from './dto/create-wiki-page.dto';
import { UpdateWikiPageDto } from './dto/update-wiki-page.dto';

@Injectable()
export class WikisService {
  constructor(
    @InjectRepository(WikiPage)
    private readonly wikiPageRepository: Repository<WikiPage>,
  ) {}

  async create(createWikiPageDto: CreateWikiPageDto): Promise<WikiPage> {
    const { title, content, projectId, authorId } = createWikiPageDto;

    // In a real application, you would fetch the project and author entities
    // For now, we'll just assign the IDs
    const newWikiPage = this.wikiPageRepository.create({
      title,
      content,
      project: { id: projectId },
      author: { id: authorId },
    });

    return this.wikiPageRepository.save(newWikiPage);
  }

  async findAll(): Promise<WikiPage[]> {
    return this.wikiPageRepository.find();
  }

  async findOne(id: number): Promise<WikiPage | null> {
    return this.wikiPageRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateWikiPageDto: UpdateWikiPageDto,
  ): Promise<WikiPage> {
    await this.wikiPageRepository.update(id, updateWikiPageDto);
    const updatedWikiPage = await this.findOne(id);
    if (!updatedWikiPage) {
      throw new NotFoundException(`WikiPage with ID ${id} not found`);
    }
    return updatedWikiPage;
  }

  async remove(id: number): Promise<void> {
    await this.wikiPageRepository.delete(id);
  }
}

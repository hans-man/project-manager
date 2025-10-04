import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WikiPage } from '../users/entities/wiki-page.entity';
import { CreateWikiPageDto } from './dto/create-wiki-page.dto';
import { UpdateWikiPageDto } from './dto/update-wiki-page.dto';
import { User } from '../users/entities/user.entity'; // Import User entity

@Injectable()
export class WikisService {
  constructor(
    @InjectRepository(WikiPage)
    private readonly wikiPageRepository: Repository<WikiPage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createWikiPageDto: CreateWikiPageDto): Promise<WikiPage> {
    const { title, content, projectId, authorId } = createWikiPageDto;

    const author = await this.userRepository.findOneBy({ id: authorId });
    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    const newWikiPage = this.wikiPageRepository.create({
      title,
      content,
      projectId: String(projectId),
      author,
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
    const { projectId, ...restOfDto } = updateWikiPageDto;
    const updateObject: Partial<WikiPage> = { ...restOfDto };
    if (projectId) {
      updateObject.projectId = String(projectId);
    }
    await this.wikiPageRepository.update(id, updateObject);
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

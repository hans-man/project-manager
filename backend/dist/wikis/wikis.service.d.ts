import { Repository } from 'typeorm';
import { WikiPage } from '../users/entities/wiki-page.entity';
import { CreateWikiPageDto } from './dto/create-wiki-page.dto';
import { UpdateWikiPageDto } from './dto/update-wiki-page.dto';
import { User } from '../users/entities/user.entity';
export declare class WikisService {
    private readonly wikiPageRepository;
    private readonly userRepository;
    constructor(wikiPageRepository: Repository<WikiPage>, userRepository: Repository<User>);
    create(createWikiPageDto: CreateWikiPageDto): Promise<WikiPage>;
    findAll(): Promise<WikiPage[]>;
    findOne(id: number): Promise<WikiPage | null>;
    update(id: number, updateWikiPageDto: UpdateWikiPageDto): Promise<WikiPage>;
    remove(id: number): Promise<void>;
}

import { WikisService } from './wikis.service';
import { CreateWikiPageDto } from './dto/create-wiki-page.dto';
import { UpdateWikiPageDto } from './dto/update-wiki-page.dto';
export declare class WikisController {
    private readonly wikisService;
    constructor(wikisService: WikisService);
    create(createWikiPageDto: CreateWikiPageDto): Promise<import("../users/entities/wiki-page.entity").WikiPage>;
    findAll(): Promise<import("../users/entities/wiki-page.entity").WikiPage[]>;
    findOne(id: string): Promise<import("../users/entities/wiki-page.entity").WikiPage | null>;
    update(id: string, updateWikiPageDto: UpdateWikiPageDto): Promise<import("../users/entities/wiki-page.entity").WikiPage>;
    remove(id: string): Promise<void>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WikisService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wiki_page_entity_1 = require("../users/entities/wiki-page.entity");
const user_entity_1 = require("../users/entities/user.entity");
let WikisService = class WikisService {
    wikiPageRepository;
    userRepository;
    constructor(wikiPageRepository, userRepository) {
        this.wikiPageRepository = wikiPageRepository;
        this.userRepository = userRepository;
    }
    async create(createWikiPageDto) {
        const { title, content, projectId, authorId } = createWikiPageDto;
        const author = await this.userRepository.findOneBy({ id: authorId });
        if (!author) {
            throw new common_1.NotFoundException(`Author with ID ${authorId} not found`);
        }
        const newWikiPage = this.wikiPageRepository.create({
            title,
            content,
            projectId: String(projectId),
            author,
        });
        return this.wikiPageRepository.save(newWikiPage);
    }
    async findAll() {
        return this.wikiPageRepository.find();
    }
    async findOne(id) {
        return this.wikiPageRepository.findOneBy({ id });
    }
    async update(id, updateWikiPageDto) {
        const { projectId, ...restOfDto } = updateWikiPageDto;
        const updateObject = { ...restOfDto };
        if (projectId) {
            updateObject.projectId = String(projectId);
        }
        await this.wikiPageRepository.update(id, updateObject);
        const updatedWikiPage = await this.findOne(id);
        if (!updatedWikiPage) {
            throw new common_1.NotFoundException(`WikiPage with ID ${id} not found`);
        }
        return updatedWikiPage;
    }
    async remove(id) {
        await this.wikiPageRepository.delete(id);
    }
};
exports.WikisService = WikisService;
exports.WikisService = WikisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wiki_page_entity_1.WikiPage)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WikisService);
//# sourceMappingURL=wikis.service.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WikiPage = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("../../common/entities/base.entity");
let WikiPage = class WikiPage extends base_entity_1.BaseEntity {
    title;
    content;
    projectId;
    author;
};
exports.WikiPage = WikiPage;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WikiPage.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], WikiPage.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WikiPage.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.wikiPages, { eager: true }),
    __metadata("design:type", user_entity_1.User)
], WikiPage.prototype, "author", void 0);
exports.WikiPage = WikiPage = __decorate([
    (0, typeorm_1.Entity)({ name: 'wiki_pages' })
], WikiPage);
//# sourceMappingURL=wiki-page.entity.js.map
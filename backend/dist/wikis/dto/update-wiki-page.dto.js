"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWikiPageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_wiki_page_dto_1 = require("./create-wiki-page.dto");
class UpdateWikiPageDto extends (0, mapped_types_1.PartialType)(create_wiki_page_dto_1.CreateWikiPageDto) {
}
exports.UpdateWikiPageDto = UpdateWikiPageDto;
//# sourceMappingURL=update-wiki-page.dto.js.map
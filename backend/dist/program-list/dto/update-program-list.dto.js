"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProgramListDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_program_list_dto_1 = require("./create-program-list.dto");
class UpdateProgramListDto extends (0, mapped_types_1.PartialType)(create_program_list_dto_1.CreateProgramListDto) {
}
exports.UpdateProgramListDto = UpdateProgramListDto;
//# sourceMappingURL=update-program-list.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCostEntryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cost_entry_dto_1 = require("./create-cost-entry.dto");
class UpdateCostEntryDto extends (0, mapped_types_1.PartialType)(create_cost_entry_dto_1.CreateCostEntryDto) {
}
exports.UpdateCostEntryDto = UpdateCostEntryDto;
//# sourceMappingURL=update-cost-entry.dto.js.map
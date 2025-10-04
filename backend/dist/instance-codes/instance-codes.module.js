"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceCodesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const instance_codes_service_1 = require("./instance-codes.service");
const instance_codes_controller_1 = require("./instance-codes.controller");
const instance_code_entity_1 = require("../entities/instance-code.entity");
let InstanceCodesModule = class InstanceCodesModule {
};
exports.InstanceCodesModule = InstanceCodesModule;
exports.InstanceCodesModule = InstanceCodesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([instance_code_entity_1.InstanceCode])],
        providers: [instance_codes_service_1.InstanceCodesService],
        controllers: [instance_codes_controller_1.InstanceCodesController],
    })
], InstanceCodesModule);
//# sourceMappingURL=instance-codes.module.js.map
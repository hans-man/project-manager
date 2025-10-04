"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelogsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const time_log_entity_1 = require("../users/entities/time-log.entity");
const timelogs_service_1 = require("./timelogs.service");
const timelogs_controller_1 = require("./timelogs.controller");
let TimelogsModule = class TimelogsModule {
};
exports.TimelogsModule = TimelogsModule;
exports.TimelogsModule = TimelogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([time_log_entity_1.TimeLog])],
        controllers: [timelogs_controller_1.TimelogsController],
        providers: [timelogs_service_1.TimelogsService],
    })
], TimelogsModule);
//# sourceMappingURL=timelogs.module.js.map
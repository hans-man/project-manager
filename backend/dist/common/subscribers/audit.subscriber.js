"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditSubscriber = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../entities/base.entity");
let AuditSubscriber = class AuditSubscriber {
    listenTo() {
        return base_entity_1.BaseEntity;
    }
    beforeInsert(event) {
        const currentUserId = 1;
        if (event.entity) {
            event.entity.createdBy = currentUserId;
            event.entity.updatedBy = currentUserId;
        }
    }
    beforeUpdate(event) {
        const currentUserId = 1;
        if (event.entity) {
            event.entity.updatedBy = currentUserId;
        }
    }
};
exports.AuditSubscriber = AuditSubscriber;
exports.AuditSubscriber = AuditSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], AuditSubscriber);
//# sourceMappingURL=audit.subscriber.js.map
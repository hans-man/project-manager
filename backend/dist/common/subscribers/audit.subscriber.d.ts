import { EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
export declare class AuditSubscriber implements EntitySubscriberInterface<BaseEntity> {
    listenTo(): typeof BaseEntity;
    beforeInsert(event: InsertEvent<BaseEntity>): void;
    beforeUpdate(event: UpdateEvent<BaseEntity>): void;
}

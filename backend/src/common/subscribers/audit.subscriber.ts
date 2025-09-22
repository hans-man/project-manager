import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface<BaseEntity> {
  listenTo() {
    return BaseEntity;
  }

  beforeInsert(event: InsertEvent<BaseEntity>) {
    // TODO: 현재 로그인한 사용자 ID를 가져오는 로직을 여기에 추가해야 합니다.
    // 이 예시에서는 임시로 1을 사용합니다. 실제 애플리케이션에서는 요청 컨텍스트에서 사용자 ID를 가져와야 합니다.
    const currentUserId = 1; // Placeholder for current user ID

    if (event.entity) {
      event.entity.createdBy = currentUserId;
      event.entity.updatedBy = currentUserId;
    }
  }

  beforeUpdate(event: UpdateEvent<BaseEntity>) {
    // TODO: 현재 로그인한 사용자 ID를 가져오는 로직을 여기에 추가해야 합니다.
    // 이 예시에서는 임시로 1을 사용합니다. 실제 애플리케이션에서는 요청 컨텍스트에서 사용자 ID를 가져와야 합니다.
    const currentUserId = 1; // Placeholder for current user ID

    if (event.entity) {
      event.entity.updatedBy = currentUserId;
    }
  }
}

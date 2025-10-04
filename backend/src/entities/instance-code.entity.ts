import { Entity, PrimaryColumn, Column } from 'typeorm';
import { BaseEntity } from '../common/entities/base.entity';

@Entity({ name: 'instance_codes' })
export class InstanceCode extends BaseEntity {
  @PrimaryColumn({ length: 20 })
  instanceIdentifier: string; // 인스턴스식별자

  @Column()
  instanceIdentifierName: string; // 인스턴스식별자명

  @PrimaryColumn({ length: 20 })
  instanceCode: string; // 인스턴스코드

  @Column()
  instanceCodeName: string; // 인스턴스코드명

  @Column({ type: 'int', default: 0 })
  queryOrder: number; // 조회순서

  @Column({ nullable: true })
  description: string; // 설명
}

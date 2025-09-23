import { Entity, Column, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Issue extends BaseEntity {
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  // 새롭게 추가되는 컬럼들
  @Column({ nullable: true })
  taskName: string; // 업무명

  @Column({ nullable: true })
  testClassification: string; // 테스트구분

  @Column({ type: 'int', nullable: true })
  testRound: number; // 테스트회차

  @Column({ nullable: true })
  programId: string; // 프로그램ID

  @Column({ nullable: true })
  programName: string; // 프로그램명

  @Column('text', { nullable: true })
  programDescription: string; // 프로그램설명

  @Column({ nullable: true })
  assigneeName: string; // 담당자명

  @Column({ type: 'datetime', nullable: true })
  developmentDueDate: Date; // 개발예정일

  @Column({ type: 'datetime', nullable: true })
  developmentCompletionDate: Date; // 개발완료일

  @Column({ nullable: true })
  status: string; // 상태 (enum으로 변경 가능)

  @Column({ nullable: true })
  managerName: string; // 관리자명

  @Column({ type: 'datetime', nullable: true })
  managerReviewCompletionDate: Date; // 관리자검토완료일

  @Column({ nullable: true })
  businessOwnerName: string; // 현업담당자명

  @Column({ type: 'datetime', nullable: true })
  businessOwnerReviewCompletionDate: Date; // 현업검토완료일
  // 여기까지 새롭게 추가되는 컬럼들

  @ManyToOne(() => Project, (project) => project.issues)
  project: Project;
}

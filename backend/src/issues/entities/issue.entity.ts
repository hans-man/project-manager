import { Entity, Column, ManyToOne } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { User } from '../../users/entities/user.entity';
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
  assigneeId: string; // 담당자 loginId

  @ManyToOne(() => User, user => user.assignedIssues)
  assignee: User;

  @Column({ type: 'datetime', nullable: true })
  developmentDueDate: Date; // 개발예정일

  @Column({ type: 'datetime', nullable: true })
  developmentCompletionDate: Date; // 개발완료일

  @Column({ nullable: true })
  status: string; // 상태 (enum으로 변경 가능)

  @Column({ default: 'Medium' }) // Add priority column with a default value
  priority: string;

  @Column({ nullable: true })
  managerId: string; // 관리자 loginId

  @ManyToOne(() => User, user => user.managedIssues)
  manager: User;

  @Column({ type: 'datetime', nullable: true })
  managerReviewCompletionDate: Date; // 관리자검토완료일

  @Column({ nullable: true })
  businessOwnerId: string; // 현업담당자 loginId

  @ManyToOne(() => User, user => user.ownedIssues)
  businessOwner: User;

  @Column({ type: 'datetime', nullable: true })
  businessOwnerReviewCompletionDate: Date;
  // 여기까지 새롭게 추가되는 컬럼들

  @ManyToOne(() => Project, project => project.issues) // Correctly define the many-to-one relationship
  project: Project;
}
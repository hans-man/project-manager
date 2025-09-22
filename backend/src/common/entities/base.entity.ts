import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date; // 등록일자

  @UpdateDateColumn({ type: 'datetime', nullable: true })
  updatedAt: Date; // 변경일자

  @Column({ type: 'int', nullable: true }) // 등록자 ID
  createdBy: number; // 등록자

  @Column({ type: 'int', nullable: true }) // 변경자 ID
  updatedBy: number; // 변경자
}

import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { BaseEntity } from '../common/entities/base.entity';

@Entity({ name: 'program_column_name' })
export class ProgramColumnName extends BaseEntity {
  @PrimaryColumn()
  projectId: number;

  @PrimaryColumn()
  columnId: string; // e.g., column1, column2, ..., column60

  @Column()
  columnName: string; // e.g., "프로그램명", "버전"

  @Column({ nullable: true, type: 'json' })
  tableConfig: object; // e.g., { type: 'text', defaultValue: '' }

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}

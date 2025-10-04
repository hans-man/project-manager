import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';








import { Issue } from '../../issues/entities/issue.entity';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity()
export class Project extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true }) // Add budget column
  budget: number;

  @Column({ default: 'Active' }) // Add status column with a default value
  status: string;

  @OneToMany(() => Issue, issue => issue.project) // Correctly define the one-to-many relationship
  issues: Issue[];

  @Column({ nullable: true })
  ownerId: string;
}

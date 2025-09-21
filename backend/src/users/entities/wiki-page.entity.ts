import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { User } from './user.entity';

@Entity({ name: 'wiki_pages' })
export class WikiPage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToOne(() => Project, (project) => project.wikiPages)
  project: Project;

  @ManyToOne(() => User, (user) => user.wikiPages, { eager: true })
  author: User;
}

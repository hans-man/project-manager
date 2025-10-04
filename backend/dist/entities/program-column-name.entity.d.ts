import { Project } from '../projects/entities/project.entity';
import { BaseEntity } from '../common/entities/base.entity';
export declare class ProgramColumnName extends BaseEntity {
    projectId: number;
    columnId: string;
    columnName: string;
    tableConfig: object;
    project: Project;
}

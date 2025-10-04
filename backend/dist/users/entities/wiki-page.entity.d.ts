import { User } from './user.entity';
import { BaseEntity } from '../../common/entities/base.entity';
export declare class WikiPage extends BaseEntity {
    title: string;
    content: string;
    projectId: string;
    author: User;
}

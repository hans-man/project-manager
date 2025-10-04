import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Project } from '../projects/entities/project.entity';
import { Task } from '../users/entities/task.entity';
import { WikiPage } from '../users/entities/wiki-page.entity';
import { TimeLog } from '../users/entities/time-log.entity';
import { Issue } from '../issues/entities/issue.entity';
import { InstanceCode } from '../entities/instance-code.entity';
import { ProgramList } from '../entities/program-list.entity';
import { ProgramColumnName } from '../entities/program-column-name.entity';
import { AuditSubscriber } from '../common/subscribers/audit.subscriber';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'Hans0209!!',
    database: process.env.DATABASE_NAME || 'project_manager_db',
    entities: [
      User,
      Project,
      Task,
      WikiPage,
      TimeLog,
      Issue,
      InstanceCode,
      ProgramList,
      ProgramColumnName,
    ],
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    subscribers: [AuditSubscriber],
  })
);
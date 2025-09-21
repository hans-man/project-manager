import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Project } from './users/entities/project.entity';
import { Task } from './users/entities/task.entity';
import { WikiPage } from './users/entities/wiki-page.entity';
import { TimeLog } from './users/entities/time-log.entity';
import { CostEntry } from './users/entities/cost-entry.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { IssuesModule } from './issues/issues.module';
import { WikisModule } from './wikis/wikis.module';
import { TimelogsModule } from './timelogs/timelogs.module';
import { CostentriesModule } from './costentries/costentries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Hans0209!!',
      database: 'project_manager_db',
      entities: [User, Project, Task, WikiPage, TimeLog, CostEntry],
      synchronize: true, // Note: synchronize: true is for development only. Set to false in production.
    }),
    UsersModule,
    AuthModule,
    IssuesModule,
    WikisModule,
    TimelogsModule,
    CostentriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

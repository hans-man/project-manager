import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { IssuesModule } from './issues/issues.module';
import { WikisModule } from './wikis/wikis.module';
import { TimelogsModule } from './timelogs/timelogs.module';
import { ProjectsModule } from './projects/projects.module';
import { InstanceCodesModule } from './instance-codes/instance-codes.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProgramListModule } from './program-list/program-list.module';
import { ProgramColumnNameModule } from './program-column-name/program-column-name.module';
import configuration from './config/configuration'; // Import configuration
import databaseConfig from './config/database.config'; // Import databaseConfig
import jwtConfig from './config/jwt.config'; // Import jwtConfig
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, databaseConfig, jwtConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get('database');
        if (!databaseConfig) {
          throw new Error('Database configuration not found');
        }
        return databaseConfig;
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const jwtConfig = await configService.get('jwt');
        if (!jwtConfig) {
          throw new Error('JWT configuration not found');
        }
        return jwtConfig;
      },
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    IssuesModule,
    WikisModule,
    TimelogsModule,
    ProjectsModule,
    InstanceCodesModule,
    DashboardModule,
    ProgramListModule,
    ProgramColumnNameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
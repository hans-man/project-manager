"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/entities/user.entity");
const project_entity_1 = require("../projects/entities/project.entity");
const task_entity_1 = require("../users/entities/task.entity");
const wiki_page_entity_1 = require("../users/entities/wiki-page.entity");
const time_log_entity_1 = require("../users/entities/time-log.entity");
const issue_entity_1 = require("../issues/entities/issue.entity");
const instance_code_entity_1 = require("../entities/instance-code.entity");
const program_list_entity_1 = require("../entities/program-list.entity");
const program_column_name_entity_1 = require("../entities/program-column-name.entity");
const audit_subscriber_1 = require("../common/subscribers/audit.subscriber");
exports.default = (0, config_1.registerAs)('database', () => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || 'Hans0209!!',
    database: process.env.DATABASE_NAME || 'project_manager_db',
    entities: [
        user_entity_1.User,
        project_entity_1.Project,
        task_entity_1.Task,
        wiki_page_entity_1.WikiPage,
        time_log_entity_1.TimeLog,
        issue_entity_1.Issue,
        instance_code_entity_1.InstanceCode,
        program_list_entity_1.ProgramList,
        program_column_name_entity_1.ProgramColumnName,
    ],
    synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
    subscribers: [audit_subscriber_1.AuditSubscriber],
}));
//# sourceMappingURL=database.config.js.map
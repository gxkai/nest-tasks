import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Task } from "src/tasks/entities/task.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'secret',
    database: 'taskmanagement',
    entities: [Task],
    synchronize: true,
}
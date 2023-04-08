import { DataSourceOptions, DataSource } from 'typeorm';
import { Configuration } from '../types/env.keys';
import { getEnvironment, getNumberEnv } from './env';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { UserEntity } from '../user/entities/user.entity';

const TypeORMConfig = (): DataSourceOptions => {
    return {
        type: 'postgres',
        host: getEnvironment(Configuration.DB_HOST),
        port: getNumberEnv(Configuration.DB_PORT),
        username: getEnvironment(Configuration.DB_USER),
        password: getEnvironment(Configuration.DB_PASSWORD),
        database: getEnvironment(Configuration.DB_NAME),
        entities: [UserEntity],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        synchronize: false,
        migrationsRun: true,
        logging: false,
        namingStrategy: new SnakeNamingStrategy(),
    };
};

export const AppDataSource: DataSource = new DataSource(TypeORMConfig());

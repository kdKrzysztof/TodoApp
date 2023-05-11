import { Sequelize } from 'sequelize';
import type { Dialect } from 'sequelize';

import config from './db.config';

const devOptions = process.env?.PRODUCTION
    ? config.production
    : config.development;

const sequelize = new Sequelize(
    devOptions.database,
    devOptions.username,
    devOptions.password,
    {
        host: devOptions.host,
        port: parseInt(process.env.DB_PORT || '5432'),
        dialect: devOptions.dialect as Dialect,
    }
);

sequelize.authenticate().catch((e) => {
    console.log(e);
});

sequelize.sync({ alter: true }).catch((e) => {
    console.log(e);
});

export default sequelize;

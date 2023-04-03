import { Sequelize } from 'sequelize';
import type { Dialect } from 'sequelize';

import config from './db.config';

const devOptions = config.development;

const sequelize = new Sequelize(
    devOptions.database,
    devOptions.username,
    devOptions.password,
    {
        host: devOptions.host,
        port: 7000,
        dialect: devOptions.dialect as Dialect,
    }
);

sequelize.authenticate().catch((e) => {
    console.log(e);
});
sequelize.sync().catch((e) => {
    console.log(e);
});

export default sequelize;

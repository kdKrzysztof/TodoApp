import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';
import User from './user.model';
import type { refreshTokenInterface } from './models.types';

const refreshToken = db.define<refreshTokenInterface>('refreshToken', {
    refreshToken: {
        type: DataTypes.STRING(),
    },
    expiration: {
        type: DataTypes.DATE,
    },
});

refreshToken.belongsTo(User, { foreignKey: 'userId' });

export default refreshToken;

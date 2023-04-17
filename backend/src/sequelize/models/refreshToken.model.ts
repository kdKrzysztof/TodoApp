import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';
import type { refreshTokenInterface } from './models.types';

const refreshToken = db.define<refreshTokenInterface>('refreshToken', {
    refreshToken: {
        type: DataTypes.STRING(),
    },
    expiration: {
        type: DataTypes.DATE,
    },
});

export default refreshToken;

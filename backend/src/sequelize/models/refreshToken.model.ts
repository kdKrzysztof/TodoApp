import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';
import type { RefreshTokenModel } from './models.types';

const refreshToken = db.define<RefreshTokenModel>('refreshToken', {
    refreshToken: {
        type: DataTypes.STRING(),
    },
    expiration: {
        type: DataTypes.DATE,
    },
});

export default refreshToken;

import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';

import type { refreshTokenInterface } from '../../../types';

const refreshToken = db.define<refreshTokenInterface>('refreshToken', {
    userId: {
        type: DataTypes.INTEGER(),
    },
    refreshToken: {
        type: DataTypes.STRING(),
    },
    expiration: {
        type: DataTypes.DATE,
    },
});

export default refreshToken;

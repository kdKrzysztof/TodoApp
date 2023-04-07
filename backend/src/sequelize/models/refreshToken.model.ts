import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';

import type { Model } from 'sequelize';

interface refreshTokenInterface extends Model {
    userId: number;
    refreshToken: string;
    expiration: Date;
}

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
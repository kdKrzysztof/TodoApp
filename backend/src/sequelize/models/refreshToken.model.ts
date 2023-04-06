import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';

const refreshToken = db.define('refreshToken', {
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
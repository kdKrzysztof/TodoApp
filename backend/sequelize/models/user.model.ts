import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';

const User = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
    },
});

export default User;

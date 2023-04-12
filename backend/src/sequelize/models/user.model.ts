import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';
import Todo from './todo.model';
import refreshToken from './refreshToken.model';
import type { UserInterface } from './models.types';

const User = db.define<UserInterface>('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true,
        },
    },
});

User.hasMany(Todo, {
    as: 'todoItem',
    foreignKey: 'userId',
});

User.hasOne(refreshToken, {
    as: 'refreshToken',
    foreignKey: 'userId',
});

export default User;

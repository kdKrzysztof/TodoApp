import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';
import Todo from './todo.model';

const User = db.define('users', {
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
    as: 'user',
    foreignKey: 'userId',
});

Todo.belongsTo(User);

export default User;

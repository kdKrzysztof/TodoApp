import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';

import type { TodoInterface } from './models.types';

const Todo = db.define<TodoInterface>('users', {
    todoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
    },
    text: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    isCompleted: {
        type: DataTypes.BOOLEAN,
    },
});

export default Todo;

import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';
import type { TodoModel } from './models.types';

const Todo = db.define<TodoModel>('Todos', {
    todoId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    desc: {
        type: DataTypes.STRING,
    },
    expiresIn: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
});

export default Todo;

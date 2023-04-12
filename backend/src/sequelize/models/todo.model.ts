import db from '../config/dbConnect';
import { DataTypes } from 'sequelize';
import User from './user.model'
import type { TodoInterface } from './models.types';

const Todo = db.define<TodoInterface>('Todos', {
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

Todo.belongsTo(User, { foreignKey: 'userId' });

export default Todo;


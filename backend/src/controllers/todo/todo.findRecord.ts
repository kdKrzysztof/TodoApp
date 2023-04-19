import type { Model } from 'sequelize';
import { statusError } from '../../middleware/errorHandler';
import todoModel from '../../sequelize/models/todo.model';

const findRecord = async (userId: number, todoId: number): Promise<Model> => {
    const foundTodoRecord = await todoModel.findOne({
        where: {
            userId: userId,
            todoId: todoId,
        },
    });

    if (!foundTodoRecord) {
        throw new statusError('Todo item not found', 400);
    }

    return foundTodoRecord;
};

export default findRecord
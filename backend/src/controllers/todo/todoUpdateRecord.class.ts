import todoModel from '../../sequelize/models/todo.model';
import type { JwtPayload } from 'jsonwebtoken';
import { Model } from 'sequelize';
import { statusError } from '../../middleware/errorHandler';

export class UpdateTodoRecord {
    private readonly userId: string;
    private readonly todoId: number;
    private readonly recordToUpdate: string;
    private readonly data;

    constructor(req: JwtPayload, recordToUpdate: string) {
        const token = req.token;
        if (!token.id) {
            throw new statusError('Invalid token parameters', 400);
        }

        const todoId = req.params.id;
        if (!todoId) {
            throw new statusError('Invalid todo id', 400);
        }

        const data = req.body[recordToUpdate];
        if (!data) {
            throw new statusError('Invalid body parameters', 400);
        }

        if (!recordToUpdate) {
            throw new Error('record to update not specified');
        }

        this.userId = token.id;
        this.todoId = todoId;
        this.recordToUpdate = recordToUpdate;
        this.data = data;
    }

    public async updateRecord(): Promise<boolean> {
        const foundRecord = await this._findRecord();

        await foundRecord.update({
            [this.recordToUpdate]: this.data,
        });

        return true;
    }

    private async _findRecord(): Promise<Model> {
        const foundTodoRecord = await todoModel.findOne({
            where: {
                userId: this.userId,
                todoId: this.todoId,
            },
        });

        if (!foundTodoRecord) {
            throw new statusError('Todo item not found', 400);
        }

        return foundTodoRecord;
    }
}

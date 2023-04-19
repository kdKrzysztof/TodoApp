import todoModel from '../../sequelize/models/todo.model';
import type { JwtPayload } from 'jsonwebtoken';
import { Model } from 'sequelize';
import { statusError } from '../../middleware/errorHandler';


export class UpdateTodoRecord {
    private readonly _userId: string;
    private readonly _todoId: number;
    private readonly _recordToUpdate: string;
    private readonly _data;

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

        this._userId = token.id;
        this._todoId = todoId;
        this._recordToUpdate = recordToUpdate;
        this._data = data;
    }

    public async updateRecord(): Promise<boolean> {
        const foundRecord = await this.findRecord();

        await foundRecord.update({
            [this._recordToUpdate]: this._data,
        });

        return true;
    }

    private async findRecord(): Promise<Model> {
        const foundTodoRecord = await todoModel.findOne({
            where: {
                userId: this._userId,
                todoId: this._todoId,
            },
        });

        if (!foundTodoRecord) {
            throw new statusError('Todo item not found', 400);
        }

        return foundTodoRecord;
    }
}

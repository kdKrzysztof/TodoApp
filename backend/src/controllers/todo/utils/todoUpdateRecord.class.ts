import type { JwtPayload } from 'jsonwebtoken';
import { statusError } from '../../../middleware/errorHandler';
import findRecordFunction from './todo.findRecord';

export class TodoRecordUpdater {
    private readonly _userId: number;
    private readonly _todoId: number;
    private readonly _recordToUpdate: string;
    private readonly _data: string;

    constructor(req: JwtPayload, recordToUpdate: string) {
        this.validateToken(req.token);
        this.validateTodoId(req.params.id);
        this.validateRecordToUpdate(recordToUpdate);
        this.validateReqBodyData(req.body[recordToUpdate]);

        this._userId = req.token.id;
        this._todoId = req.params.id;
        this._recordToUpdate = recordToUpdate;
        this._data = req.body[recordToUpdate];
    }

    private validateToken(token: JwtPayload['token']): void {
        if (!token.id) {
            throw new statusError('Invalid token parameters', 400);
        }
    }

    private validateTodoId(todoId: JwtPayload['params']['id']): void {
        if (!todoId) {
            throw new statusError('Invalid todo id', 400);
        }
    }

    private validateRecordToUpdate(recordToUpdate: string): void {
        if (!recordToUpdate) {
            throw new statusError('record to update not specified', 400);
        }
    }

    private validateReqBodyData(data: string): void {
        if (!data) {
            throw new statusError('Invalid body parameters', 400);
        }
    }

    public async updateRecord(): Promise<boolean> {
        const foundRecord = await this.findRecord(this._userId, this._todoId);

        await foundRecord.update({
            [this._recordToUpdate]: this._data,
        });

        return true;
    }

    private findRecord = findRecordFunction;
}

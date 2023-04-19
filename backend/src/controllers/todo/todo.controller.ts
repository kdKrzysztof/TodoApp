import todoModel from '../../sequelize/models/todo.model';
import authMiddleware from '../../middleware/auth';
import { Router } from 'express';
import { errorHandler, statusError } from '../../middleware/errorHandler';
import {
    todoAddValidation,
    todoTitleUpdateValidation,
    todoExpInUpdateValidation,
} from '../../scripts/validationTypes';
import type { Response } from 'express';
import type { AddTodo, TodoListData } from './todo.types';
import type { JwtPayload } from 'jsonwebtoken';
import { TodoRecordUpdater } from './utils/todoUpdateRecord.class';
import getValidationErrors from '../../scripts/getValidationErrors';
import findRecordFunction from './utils/todo.findRecord';

const router = Router();

router.use(authMiddleware);

router.get('/', async (req: JwtPayload, res: Response) => {
    try {
        const token = req.token;

        if (token.id === null || undefined) {
            throw new statusError('Invalid token parameters', 400);
        }

        const foundTodoList = await todoModel.findAll({
            where: {
                userId: token.id,
            },
        });

        const parsedTodoListData: TodoListData[] = [];

        foundTodoList.forEach((element) => {
            const Todo = {
                userId: element?.userId,
                todoId: element?.todoId,
                title: element?.title,
                desc: element?.desc,
                createdAt: element?.createdAt,
                expiresIn: element?.expiresIn,
            };

            parsedTodoListData.push(Todo);
        });

        return res.status(200).json(parsedTodoListData);
    } catch (err) {
        console.error((err as Error).stack);
        throw err;
    }
});

router.post('/', todoAddValidation, async (req: JwtPayload, res: Response) => {
    try {
        if (await getValidationErrors(req, res)) {
            return;
        }

        const token = req.token;

        if (token.id === null || undefined) {
            throw new statusError('Invalid token parameters', 400);
        }

        const userData: AddTodo = req.body;

        await todoModel.create({
            userId: token?.id,
            title: userData.Title,
            desc: userData.Desc,
            expiresIn: userData.expiresIn,
        });

        res.sendStatus(204);
    } catch (err) {
        console.error((err as Error).stack);
        throw err;
    }
});

router.delete('/:id', async (req: JwtPayload, res: Response) => {
    try {
        const token = req.token;
        if (!token.id) {
            throw new statusError('Invalid token parameters', 400);
        }

        const todoId = req.params.id;

        const foundTodoItem = await findRecordFunction(token.id, todoId);

        if (foundTodoItem) {
            foundTodoItem.destroy();
            res.sendStatus(204);
        } else {
            throw new statusError('Todo item not found', 404);
        }
    } catch (err) {
        console.error((err as Error).stack);
        throw err;
    }
});

router.patch(
    '/updateTitle/:id',
    todoTitleUpdateValidation,
    async (req: JwtPayload, res: Response) => {
        try {
            if (await getValidationErrors(req, res)) {
                return;
            }

            const updateRecord = new TodoRecordUpdater(req, 'title');
            await updateRecord.updateRecord();

            if (updateRecord) {
                return res.sendStatus(204);
            }
        } catch (err) {
            console.error((err as Error).stack);
            throw err;
        }
    }
);

router.patch('/updateDesc/:id', async (req: JwtPayload, res: Response) => {
    try {
        if (await getValidationErrors(req, res)) {
            return;
        }

        const updateRecord = new TodoRecordUpdater(req, 'desc');
        await updateRecord.updateRecord();

        if (updateRecord) {
            return res.sendStatus(204);
        }
    } catch (err) {
        console.error((err as Error).stack);
        throw err;
    }
});

router.patch(
    '/updateExpIn/:id',
    todoExpInUpdateValidation,
    async (req: JwtPayload, res: Response) => {
        try {
            if (await getValidationErrors(req, res)) {
                return;
            }

            const updateRecord = new TodoRecordUpdater(req, 'expiresIn');
            await updateRecord.updateRecord();

            if (updateRecord) {
                return res.sendStatus(204);
            }
        } catch (err) {
            console.error((err as Error).stack);
            throw err;
        }
    }
);

router.use(errorHandler);

export default router;

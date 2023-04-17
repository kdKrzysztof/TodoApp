import todoModel from '../../sequelize/models/todo.model';
import authMiddleware from '../../middleware/auth';
import { Router } from 'express';
import { errorHandler, statusError } from '../../middleware/errorHandler';
import { validationResult } from 'express-validator';
import {
    todoAddValidation,
    errorFormatter,
} from '../../scripts/validationTypes';
import type { Response } from 'express';
import type { addTodo, todoListData } from './todo.types';
import type { JwtPayload } from 'jsonwebtoken';

const router = Router();

router.use(authMiddleware);

router.get('/GET', async (req: JwtPayload, res: Response) => {
    try {
        const validationErrors =
            validationResult(req).formatWith(errorFormatter);
        if (!validationErrors.isEmpty()) {
            return res.status(400).send({
                errors: validationErrors.array(),
            });
        }

        const token = req.token;

        if (token.id === null || undefined) {
            throw new statusError('Invalid token parameters', 400);
        }

        const foundTodoList = await todoModel.findAll({
            where: {
                userId: token.id,
            },
        });

        const parsedTodoListData: todoListData[] = [];

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

router.post(
    '/ADD',
    todoAddValidation,
    async (req: JwtPayload, res: Response) => {
        try {
            const validationErrors =
                validationResult(req).formatWith(errorFormatter);
            if (!validationErrors.isEmpty()) {
                return res.status(400).send({
                    errors: validationErrors.array(),
                });
            }

            const token = req.token;

            if (token.id === null || undefined) {
                throw new statusError('Invalid token parameters', 400);
            }

            const userData: addTodo = req.body;

            await todoModel.create({
                userId: token?.id,
                title: userData.Title,
                desc: userData.Desc,
                expiresIn: userData.expiresIn,
            });

            res.sendStatus(200);
        } catch (err) {
            console.error((err as Error).stack);
            throw err;
        }
    }
);

router.use(errorHandler);

export default router;

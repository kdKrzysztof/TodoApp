import todoModel from '../../sequelize/models/todo.model';
import authMiddleware from '../../middleware/auth';
import { Router } from 'express';
import { errorHandler, statusError } from '../../middleware/errorHandler';
import { validationResult } from 'express-validator';
import { addValidation, errorFormatter } from '../../scripts/validationTypes';
import type { Response } from 'express';
import type { addTodo } from './todo.types';
import type { JwtPayload } from 'jsonwebtoken';

const router = Router();

router.use(authMiddleware);

router.post('/add', addValidation, async (req: JwtPayload, res: Response) => {
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
        if (err instanceof statusError) {
            throw err;
        } else {
            console.error((err as Error).stack);
            throw new Error(
                'An unexpected error while creating new Todo, please try again later'
            );
        }
    }
});

router.use(errorHandler);

export default router;

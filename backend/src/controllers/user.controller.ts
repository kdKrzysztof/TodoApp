import userModel from '../sequelize/models/user.model';
import { Router } from 'express';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { registerValidation } from '../scripts/validationTypes';

import type { Response, Request } from 'express';
import type { ValidationError } from 'express-validator';

const router = Router();

const errorFormatter = ({
    location,
    msg,
    param,
    value,
    nestedErrors,
}: ValidationError) => {
    return msg;
};

router.post(
    '/register',
    registerValidation,
    async (req: Request, res: Response) => {
        const validationErrors =
            validationResult(req).formatWith(errorFormatter);
        if (!validationErrors.isEmpty()) {
            return res.status(400).send({ errors: validationErrors.array() });
        }

        const userData = req.body;
        res.sendStatus(200);
    }
);

router.post('/login', async (req, res) => {});

router.post('/logout', async (req, res) => {});

export default router;

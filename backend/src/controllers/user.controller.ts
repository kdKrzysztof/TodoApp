import userModel from '../sequelize/models/user.model';
import { ErrorRequestHandler, Router } from 'express';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { registerValidation, errorFormatter } from '../scripts/validationTypes';
import type { Response, Request } from 'express';
import 'express-async-errors';

const router = Router();

router.post(
    '/register',
    registerValidation,
    async (req: Request, res: Response) => {
        const validationErrors =
            validationResult(req).formatWith(errorFormatter);

        if (!validationErrors.isEmpty()) {
            return res.status(400).send({
                errors: validationErrors.array(),
            });
        }

        const userData = req.body;

        const userExists = await userModel
            .findOne({
                where: {
                    username: userData.username,
                },
            })
            .catch((err) => {
                return res.status(403).send({ error: err });
            });

        const emailExists = await userModel
            .findOne({
                where: {
                    email: userData.email,
                },
            })
            .catch((err) => {
                return res.status(500).send({ error: err });
            });

        if (userExists !== null) {
            throw new Error('This username is taken');
        }

        if (emailExists !== null) {
            throw new Error(
                'Email is already in use. Login to account with this email.'
            );
        }

        const hashedPassword = await argon2
            .hash(userData.password)
            .catch(() => {
                return res.sendStatus(500);
            });

        userModel
            .create({
                username: userData.username,
                email: userData.email,
                password: hashedPassword,
            })
            .then(() => {
                return res.status(200).send('Account has been created.');
            })
            .catch((err) => {
                return res.status(500).send({ error: err });
            });
    }
);

router.post('/login', async (req, res) => {});

router.post('/logout', async (req, res) => {});

const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
    return res.status(401).send({
        message: err.message,
    });
};

router.use(errorHandler);

export default router;

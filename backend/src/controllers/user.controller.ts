import userModel from '../sequelize/models/user.model';
import refreshTokenModel from '../sequelize/models/refreshToken.model';
import * as argon2 from 'argon2';
import {
    registerValidation,
    loginValidation,
    validationError
} from '../scripts/validationTypes';
import { statusError, errorHandler } from '../middleware/errorHandler';
import generateJWT from '../scripts/generateJWT';
import { register_userData, login_userData } from '../../types';

import { Router } from 'express';
import type { Response, Request } from 'express';
import 'express-async-errors';
const router = Router();

router.post(
    '/register',
    registerValidation,
    async (req: Request, res: Response) => {
        try {
            validationError(req, res)

            const userData: register_userData = req.body;

            const userExists = await userModel.findOne({
                where: {
                    username: userData.username,
                },
            });

            const emailExists = await userModel.findOne({
                where: {
                    email: userData.email,
                },
            });

            if (userExists !== null) {
                throw new statusError('This username is taken', 409);
            }

            if (emailExists !== null) {
                throw new statusError(
                    'Email is already in use. Login to account with this email.',
                    409
                );
            }

            const hashedPassword = await argon2.hash(userData.password);

            userModel.create({
                username: userData.username,
                email: userData.email,
                password: hashedPassword,
            });
            return res.status(200).send('Account has been created.');
        } catch (err) {
            console.error((err as Error).stack);
            throw new Error(
                'An unexpected error while creating user occured, please try again later'
            );
        }
    }
);

router.post('/login', loginValidation, async (req: Request, res: Response) => {
    try {
        validationError(req, res)

        const userData: login_userData = req.body;

        const user = await userModel.findOne({
            where: {
                email: userData.email,
            },
        });

        if (!user?.password) {
            throw new statusError('Wrong credentials', 401);
        }

        if (!(await argon2.verify(user.password, userData.password))) {
            throw new statusError('Wrong credentials', 401);
        }

        const token = await generateJWT(user.id, user.email);
        return res.status(200).json({
            ...token,
            userData: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error((err as Error).stack);
        throw new Error('Unexpected error occured while logging');
    }
});

router.post('/logout', async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;

    try {
        await refreshTokenModel.destroy({
            where: {
                refreshToken: refreshToken,
            },
        });
        return res.sendStatus(204);
    } catch (err) {
        throw new Error(
            `Unexpected error occured while trying to log out. Try again later`
        );
    }
});

router.use(errorHandler);

export default router;

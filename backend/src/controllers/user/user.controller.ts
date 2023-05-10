import userModel from '../../sequelize/models/user.model';
import refreshTokenModel from '../../sequelize/models/refreshToken.model';
import * as argon2 from 'argon2';
import {
    registerValidation,
    loginValidation,
    logoutValidation,
} from '../../scripts/validationTypes';
import { statusError, errorHandler } from '../../middleware/errorHandler';
import generateJWT from '../../scripts/generateJWT';

import type {
    Register_userData,
    Login_userData,
    RefreshToken_Body,
} from './user.types';
import type { Response, Request } from 'express';

import { Router } from 'express';
import 'express-async-errors';
import getValidationErrors from '../../scripts/getValidationErrors';

const router = Router();

router.post(
    '/register',
    registerValidation,
    async (req: Request, res: Response) => {
        try {
            if (await getValidationErrors(req, res)) {
                return;
            }

            const userData: Register_userData = req.body;

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

            await userModel.create({
                username: userData.username,
                email: userData.email,
                password: hashedPassword,
            });
            return res.status(200).send('Account has been created.');
        } catch (err) {
            console.error((err as Error).stack);
            throw err;
        }
    }
);

router.post('/login', loginValidation, async (req: Request, res: Response) => {
    try {
        if (await getValidationErrors(req, res)) {
            return;
        }

        const userData: Login_userData = req.body;

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
        throw err;
    }
});

router.post(
    '/logout',
    logoutValidation,
    async (req: Request, res: Response) => {
        try {
            if (await getValidationErrors(req, res)) {
                return;
            }

            const refreshToken: RefreshToken_Body = req.body.refreshToken;

            const foundModel = await refreshTokenModel.findOne({
                where: {
                    refreshToken: refreshToken,
                },
            });

            if (foundModel === null) {
                return res.sendStatus(400);
            }

            await foundModel?.destroy();

            return res.sendStatus(204);
        } catch (err) {
            console.error((err as Error).stack);
            throw err;
        }
    }
);

router.post('/refreshToken', async (req: Request, res: Response) => {
    try {
        const refreshToken: RefreshToken_Body = req.body.refreshToken;

        const refTokenData = await refreshTokenModel.findOne({
            where: {
                refreshToken: refreshToken,
            },
        });

        if (!refTokenData?.refreshToken) {
            throw new statusError('Refresh token not found', 404);
        }

        if (new Date(refTokenData?.expiration) < new Date()) {
            throw new statusError('Refresh token expired', 401);
        }

        const user = await userModel.findOne({
            where: {
                id: refTokenData.userId,
            },
        });

        const newToken = await generateJWT(
            user?.id as number,
            user?.email as string
        );

        res.status(200).json(newToken);
    } catch (err) {
        console.error((err as Error).stack);
        throw err;
    }
});

router.use(errorHandler);

export default router;

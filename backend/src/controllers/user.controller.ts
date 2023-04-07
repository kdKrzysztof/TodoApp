import userModel from '../sequelize/models/user.model';
import { Router } from 'express';
import * as argon2 from 'argon2';
import { validationResult } from 'express-validator';
import { registerValidation, errorFormatter } from '../scripts/validationTypes';
import type { Response, Request } from 'express';
import 'express-async-errors';
import { statusError, errorHandler } from '../middleware/errorHandler';
import generateJWT from '../scripts/generateJWT';

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
            .catch(() => {
                throw new Error(
                    'An unexpected error while searching for user data occured, please try again later'
                );
            });

        const emailExists = await userModel
            .findOne({
                where: {
                    email: userData.email,
                },
            })
            .catch(() => {
                throw new Error(
                    'An unexpected error while searching for user data occured, please try again later'
                );
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

        const hashedPassword = await argon2
            .hash(userData.password)
            .catch(() => {
                throw new Error(
                    'An unexpected error while hashing password occurred, please try again later'
                );
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
                throw new Error(
                    'An unexpected error while creating user occured, please try again later'
                );
            });
    }
);

router.post('/login', async (req, res) => {
    const userData = req.body;

    const user = await userModel
        .findOne({
            where: {
                email: userData.email,
            },
        })
        .catch(() => {
            throw new Error(
                'An unexpected error while searching for user data occured, please try again later'
            );
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
});

router.post('/logout', async (req, res) => {});

router.use(errorHandler);

export default router;

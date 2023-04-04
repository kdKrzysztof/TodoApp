import userModel from '../sequelize/models/user.model';
import { Router } from 'express';
import * as argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { validationResult, check, oneOf } from 'express-validator';
import { registerInterface } from '../../types';
import type { Response } from 'express';

const router = Router();

const validation = [
    check('username')
        .exists()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 30 })
        .withMessage(
            'Invalid username length, make sure your username is greater than 3 and less than 30 letters'
        )
        .isAlphanumeric()
        .withMessage(`Invalid username, can't contain special characters`),
    check('email')
        .exists()
        .withMessage('Email address is required')
        .isEmail()
        .withMessage('Invalid email'),
    check('password').exists().withMessage('Password is required'),
];

router.post(
    '/register',
    validation,
    async (req: registerInterface, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array() });
        }

        const userData = req.body;
        res.sendStatus(200);
    }
);

router.post('/login', async (req, res) => {});

router.post('/logout', async (req, res) => {});

export default router;

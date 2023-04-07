import jwt from 'jsonwebtoken';
import refreshTokenModel from '../sequelize/models/refreshToken.model';
import cryptoRandomString from 'crypto-random-string';
import { errorHandler } from '../middleware/errorHandler';
import { Router } from 'express';

import * as dotenv from 'dotenv';
dotenv.config();

const router = Router();

function addHours(date: Date, hours: number) {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);

    return date;
}

const generateJWT = async (userId: number, userEmail: string) => {
    const dataToSign = {
        id: userId,
        email: userEmail,
    };

    const newRefreshToken = await cryptoRandomString.async({ length: 40 });

    const token = jwt.sign(dataToSign, process.env.JWT_SECRET as string, {
        expiresIn: process.env.TOKEN_LIFE,
    });

    await refreshTokenModel
        .destroy({
            where: {
                userId: userId,
            },
        })
        .catch(() => {
            throw new Error('Problem occured while deleting old refresh token');
        });

    const expiresAt = addHours(new Date(), 4);

    await refreshTokenModel
        .create({
            userId: userId,
            refreshToken: newRefreshToken,
            expiration: expiresAt,
        })
        .catch(() => {
            throw new Error('Problem occured while creating auth token');
        });

    const response = {
        status: 'Logged in',
        token,
        newRefreshToken,
    };

    return response;
};

router.use(errorHandler);

export default generateJWT;

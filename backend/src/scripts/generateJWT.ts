import jwt from 'jsonwebtoken';
import refreshTokenModel from '../sequelize/models/refreshToken.model';
import cryptoRandomString from 'crypto-random-string';

import * as dotenv from 'dotenv';
dotenv.config();

const addHours = (hours: number) => {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);

    return date;
};

const generateJWT = async (userId: number, userEmail: string) => {
    const dataToSign = {
        id: userId,
        email: userEmail,
    };

    const newRefreshToken = await cryptoRandomString.async({ length: 40 });

    const token = jwt.sign(dataToSign, process.env.JWT_SECRET as string, {
        expiresIn: process.env.TOKEN_LIFE,
    });

    await refreshTokenModel.destroy({
        where: {
            userId: userId,
        },
    });

    const expiresAt = addHours(4);

    await refreshTokenModel.create({
        userId: userId,
        refreshToken: newRefreshToken,
        expiration: expiresAt,
    });

    return {token, newRefreshToken}
};

export default generateJWT;

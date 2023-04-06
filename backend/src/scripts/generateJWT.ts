import jwt from 'jsonwebtoken';
import refreshTokenModel from '../sequelize/models/refreshToken.model';
import { cryptoRandomStringAsync } from 'crypto-random-string';
import { errorHandler } from '../middleware/errorHandler';
import router from '../controllers/user.controller';

function addHours(date: Date, hours: number) {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);

    return date;
}

const generateJWT = async (userId: number, userEmail: string) => {
    const dataToSign = {
        id: userId,
        email: userEmail,
    };

    const newRefreshToken = await cryptoRandomStringAsync({ length: 40 });

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

    await refreshTokenModel.create({
        userId: userId,
        refreshToken: newRefreshToken,
        expiration: expiresAt,
    });

    const response = {
        status: 'Logged in',
        token,
        newRefreshToken,
    };

    return response;
};

router.use(errorHandler);

export default generateJWT

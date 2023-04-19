import User from '../../src/sequelize/models/user.model';
import dummyUser from '../lib/dummyUser';
import * as argon2 from 'argon2';

export const createUser = async () => {
    const hashedPassword = await argon2.hash(dummyUser.password);
    await User.create({
        username: dummyUser.username,
        email: dummyUser.email,
        password: hashedPassword,
    });
};

export const destroyUser = async () => {
    await User.destroy({
        where: {
            username: dummyUser.username,
            email: dummyUser.email,
        },
    });
};

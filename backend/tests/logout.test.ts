import supertest from 'supertest';
import app from '../index';
import dummyUser from './lib/dummyUser';
import { createUser, destroyUser } from './scripts/queries';

describe('POST /auth/logout', () => {
    let refreshToken: string;

    before(async () => {
        await createUser();
        
        await supertest(app)
            .post('/auth/login')
            .send({
                email: dummyUser.email,
                password: dummyUser.password,
            })
            .then((res) => {
                refreshToken = res.body.newRefreshToken;
            });
    });

    after(destroyUser);

    it('Should return 204', async () => {
        await supertest(app)
            .post('/auth/logout')
            .send({
                refreshToken: refreshToken,
            })
            .expect(204);
    });
});

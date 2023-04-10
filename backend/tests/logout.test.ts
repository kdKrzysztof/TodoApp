import supertest from 'supertest';
import app from '../index';
import dummyUser from './lib/dummyUser';

describe('POST /auth/logout', () => {
    let refreshToken: string;

    beforeEach(async () => {
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

    it('Should return 204', async () => {
        await supertest(app)
            .post('/auth/logout')
            .send({
                refreshToken: refreshToken,
            })
            .expect(204);
    });
});

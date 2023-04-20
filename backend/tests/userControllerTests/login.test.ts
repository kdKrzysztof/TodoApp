import supertest from 'supertest';
import app from '../../index';
import dummyUser from '../lib/dummyUser';
import { expect } from 'chai';
import { createUser, destroyUser } from '../scripts/queries';

describe('POST /auth/login', () => {
    before(createUser);
    afterEach(destroyUser);

    it('Should return 200 with a token, refresh token and user details', async () => {
        await supertest(app)
            .post('/auth/login')
            .send({
                email: dummyUser.email,
                password: dummyUser.password,
            })
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(async (res) => {
                expect(res.body).to.have.property('Token');
                expect(res.body).to.have.property('newRefreshToken');
                expect(res.body).to.have.property('userData');
                expect(res.body.userData).to.have.property('id');
                expect(res.body.userData).to.deep.equal({
                    username: dummyUser.username,
                    email: dummyUser.email,
                });
            });
    });

    it('Should return 400', async () => {
        await supertest(app)
            .post('/auth/login')
            .send({
                email: 'eeee',
                password: 'qwe123',
            })
            .expect(400);
    });

    it('Should return 401', async () => {
        await supertest(app)
            .post('/auth/login')
            .send({
                email: 'eeee@mail.com',
                password: 'qwe123',
            })
            .expect(401);
    });

    it('Should return 401', async () => {
        await supertest(app)
            .post('/auth/login')
            .send({
                email: dummyUser.email,
                password: 'qwe123',
            })
            .expect(401);
    });
});

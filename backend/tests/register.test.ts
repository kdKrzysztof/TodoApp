import supertest from 'supertest';
import app from '../index';
import dummyUser from './lib/dummyUser';

describe('POST /auth/register', () => {
    it('Should return status 200 or 409', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({
                username: dummyUser.username,
                email: dummyUser.email,
                password: dummyUser.password,
            })
            .expect([200, 409]); // returns successful registration, and error 409 if email/username already exists in database
    });
    it('Should return status 400', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({
                username: 'e1',
                email: 'e2',
                password: 'e3',
            })
            .expect(400); // bad user account details
    });
});

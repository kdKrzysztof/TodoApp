import supertest from 'supertest';
import app from '../index';
import dummyUser from './lib/dummyUser';
import { createUser, destroyUser } from './scripts/queries';

describe('POST /auth/register', () => {
    describe('Successful registration', () => {
        after(destroyUser);

        it('Should return status 200', async () => {
            await supertest(app)
                .post('/auth/register')
                .send({
                    username: dummyUser.username,
                    email: dummyUser.email,
                    password: dummyUser.password,
                })
                .expect(200);
        });
    });

    describe('failed registration', async () => {
        before(createUser);
        after(destroyUser);

        it('Should return status 409', async () => {
            await supertest(app)
                .post('/auth/register')
                .send({
                    username: dummyUser.username,
                    email: dummyUser.email,
                    password: dummyUser.password,
                })
                .expect(409);
        });
    });

    describe('Wrong account details', () => {
        it('Should return status 400', async () => {
            await supertest(app)
                .post('/auth/register')
                .send({
                    username: 'e1',
                    email: 'e2',
                    password: 'e3',
                })
                .expect(400);
        });

        it('Should return status 400', async () => {
            await supertest(app)
                .post('/auth/register')
                .send({
                    username: '',
                    email: '',
                    password: '',
                })
                .expect(400);
        });
    });
});

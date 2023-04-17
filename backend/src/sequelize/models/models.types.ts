import type { Model } from 'sequelize';

export interface refreshTokenInterface extends Model {
    userId: number;
    refreshToken: string;
    expiration: Date;
}

export interface TodoInterface extends Model {
    todoId: number;
    userId: number;
    title: string;
    desc: string;
    expiresIn: Date;
    createdAt: Date;
}

export interface UserInterface extends Model {
    id: number;
    username: string;
    email: string;
    password: string;
}

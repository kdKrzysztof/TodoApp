import type { Model } from 'sequelize';

export interface RefreshTokenModel extends Model {
    userId: number;
    refreshToken: string;
    expiration: Date;
}

export interface TodoModel extends Model {
    todoId: number;
    userId: number;
    title: string;
    desc: string;
    important: boolean;
    expiresIn: Date;
    createdAt: Date;
}

export interface UserModel extends Model {
    id: number;
    username: string;
    email: string;
    password: string;
}

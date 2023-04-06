import type { ErrorRequestHandler } from 'express';

export class statusError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}

export const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
    console.log(err.message)
    return res.status(err.status || 500).send({
        message: err.message,
    });
};


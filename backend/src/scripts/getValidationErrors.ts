import type { Request, Response } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { errorFormatter } from './validationTypes';

const getValidationErrors = async (
    req: Request | JwtPayload,
    res: Response
) => {
    const validationErrors = validationResult(req).formatWith(errorFormatter);
    if (!validationErrors.isEmpty()) {
        return res.status(400).send({
            errors: validationErrors.array(),
        });
    }
};

export default getValidationErrors;

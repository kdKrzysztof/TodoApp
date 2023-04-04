import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
        return res.status(401).json({ error: true, message: 'Missing token' });
    }

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: "Unauthorized access"})
        } else {
            next();
        }
    });
};

export default auth;
import authMiddleware from '../../middleware/auth';
import { Router } from 'express';
import type { Request, Response } from 'express';
import { errorHandler, statusError } from '../../middleware/errorHandler';
const router = Router();

router.use(authMiddleware);

router.post('/add', (req: Request, res: Response) => {
    try {
        
    } catch (err) {
        if (err instanceof statusError) {
            throw err;
        } else {
            console.error((err as Error).stack);
            res.status(400).send('unexpected error');
        }
    }
});

router.use(errorHandler);

export default router;

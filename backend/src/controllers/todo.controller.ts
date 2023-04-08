import authMiddleware from '../middleware/auth';
import { Router } from 'express';
import type { Request, Response } from 'express';
import { errorHandler } from '../middleware/errorHandler';
const router = Router();

router.use(authMiddleware)

router.post('/test', (req: Request, res: Response) => {
    try {
        res.status(200).send('authorized access');
    } catch (err) {
        console.error((err as Error).stack);
        res.status(400).send('unexpected error');
    }
});

router.use(errorHandler);

export default router;

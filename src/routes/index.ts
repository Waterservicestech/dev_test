import { Router } from 'express';
import userRouter from './users.routes';
import postRouter from './posts.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);

export default router;
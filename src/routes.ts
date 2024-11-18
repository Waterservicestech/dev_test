import { Router } from 'express';
import userRouter from './controllers/UserController';
import postRouter from './controllers/PostController';

const routers = Router();

routers.use('/users', userRouter);
routers.use('/posts', postRouter);

export default routers;
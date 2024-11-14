import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { PostController } from './controllers/PostController';

const routes = Router();

routes.post('/users', UserController.create);
routes.post('/posts', PostController.create);

export default routes;

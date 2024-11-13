import { Router } from 'express';
import userRoutes from './userRoutes';
import postRoutes from './postRoutes';

const routes = Router();

routes.use('/', userRoutes);
routes.use('/', postRoutes);

export default routes;
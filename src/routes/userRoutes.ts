import { Router } from 'express';
import { createUser } from '../controllers/userController/createUser';

const userRoutes = Router();

userRoutes.post('/users', createUser);

export default userRoutes;
import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validations';
import UserController from '../controllers/userController';

const userController = new UserController();

const router = Router();

router.post(
    '/',
    Validations.validateUser,
    (req: Request, res: Response) => userController.createUser(req, res),
);

export default router;
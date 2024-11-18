import { Request, Router, Response } from 'express';
import Validations from '../middlewares/Validations';
import PostController from '../controllers/postController';

const postController = new PostController();

const router = Router();

router.post(
    '/',
    Validations.validatePost,
    (req: Request, res: Response) => postController.createPost(req, res),
);

export default router;
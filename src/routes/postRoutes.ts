import { Router } from 'express';
import { createPost } from '../controllers/postController/createPost';

const postRoutes = Router();

postRoutes.post('/posts', createPost);

export default postRoutes;

import { Router } from 'express';
import { PostController } from '../controllers/postController';
import { PostService } from '../services/postService';

const router = Router();
const postService = new PostService();
const postController = new PostController(postService);

router.post('/', postController.createPost.bind(postController));
router.get('/', postController.getAllPosts.bind(postController));

export default router;

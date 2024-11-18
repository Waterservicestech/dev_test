import { PostController } from '../controllers/post-controller';
import { PostRepository } from '../repositories/post-repository';
import { UserRepository } from '../repositories/user-repository';
import { PostService } from '../services/post-service';

const makePostController = (): PostController => {
  const userRepository = new UserRepository();
  const postRepository = new PostRepository();
  const postService = new PostService(userRepository, postRepository);
  return new PostController(postService);
};

export default makePostController;
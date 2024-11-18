import { PostDTO } from '../dtos/post-dto';
import { PostResponseDTO } from '../dtos/post-response-dto';
import { PostRepository } from '../repositories/post-repository';
import { UserRepository } from '../repositories/user-repository';
import { NotFoundError } from '../utils/errors/not-found-error';

export class PostService {
  constructor(private userRepository: UserRepository, private postRepository: PostRepository) {}

  async createPost(data: PostDTO) {
    const { userId, ...post } = data;
    const user = await this.userRepository.get(data.userId);
    if (!user) throw new NotFoundError(`Couldn't find the specified user.`);

    const createdPost = await this.postRepository.create({ ...post, user })
    return new PostResponseDTO(createdPost);
  }
}
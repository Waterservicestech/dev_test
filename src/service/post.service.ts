import { postRepository } from '../repository/post.repository';
import { PostRequestDTO } from '../controller/dto/post-request.dto';
import { PostResponseDTO } from '../controller/dto/post-response.dto';

export class PostService {
  async createPost(data: PostRequestDTO): Promise<PostResponseDTO> {
    const post = postRepository().create(data);
    await postRepository().save(post);
    return post;
  }

  async getPosts(): Promise<PostResponseDTO[]> {
    return postRepository().find();
  }

  async getPostById(id: number): Promise<PostResponseDTO | null> {
    return postRepository().findOneBy({ id });
  }
}

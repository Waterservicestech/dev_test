import { postRepository } from '../repository/post.repository';
import { PostRequestDTO } from '../controller/dto/post-request.dto';
import { PostResponseDTO } from '../controller/dto/post-response.dto';
import { userRepository } from '../repository/user.repository';

export class PostService {
   /**
   * Cria um novo post com os dados fornecidos.
   * Verifica se o usuário associado existe.
   * Retorna o post criado.
   */
  async createPost(data: PostRequestDTO): Promise<PostResponseDTO> {
    const user = await userRepository().findOneBy({ id: data.userId });
    if (!user) {
      throw new Error('User not found');
    }

    const post = postRepository().create(data);
    await postRepository().save(post);
    return post;
  }

  // Retorna uma lista de todos os posts.
  async getPosts(): Promise<PostResponseDTO[]> {
    return postRepository().find();
  }

  /*
   * Retorna um post por ID.
   * Se o post não existir, lança um erro.
   */
  async getPostById(id: number): Promise<PostResponseDTO> {
    const post = await postRepository().findOneBy({ id });
    if (!post) {
      throw new Error('Post não encontrado');
    }
    return post;
  }

  // Deleta um post por ID.
  async deletePostById(id: number): Promise<void> {
    const post = await postRepository().findOneBy({ id });
    if (!post) {
      throw new Error('Post nao encontrado');
    }
    await postRepository().remove(post);
  }
}

import AppDataSource from '../data-source';
import { Post } from '../entity/Post';

export class PostRepository {
  private repo = AppDataSource.getRepository(Post);

  async create(data: Partial<Post>): Promise<Post> {
    const createdPost = this.repo.create(data)
    return this.repo.save(createdPost);
  }
}
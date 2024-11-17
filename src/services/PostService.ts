import { Post } from "../entity/Post";
import { User } from "../entity/User";
import database from "../infra/db";

export class PostService {
  private PostRepository = database.AppDataSource.getRepository(Post)

  async createPost(title: string, description: string, userId: number) : Promise<Post> {
      const post = this.PostRepository.create({ title, description, userId })

      return await this.PostRepository.save(post);
  }
}
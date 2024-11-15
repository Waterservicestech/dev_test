import { AppDataSource } from "..";
import { Post } from "../entity/Post";

export class PostService {
  private postRespository = AppDataSource.getRepository(Post);

  async createPost(title: string, description: string, userId: number): Promise<Post> {
    const newPost = this.postRespository.create({ title, description, user: { id: userId } });

    return await this.postRespository.save(newPost);
  }
}
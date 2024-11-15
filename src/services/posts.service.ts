import { AppDataSource } from "..";
import { Post } from "../entity/Post";
import { UserService } from './users.service';

export class PostService {
  private postRespository = AppDataSource.getRepository(Post);
  private userService = new UserService();

  async createPost(title: string, description: string, userId: number): Promise<Post> {
    const user = await this.userService.getUserById(userId);
    
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const newPost = this.postRespository.create({ 
      title, 
      description, 
      user });

    return await this.postRespository.save(newPost);
  }
}
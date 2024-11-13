import { Post } from "@entity/Post";
import { AppDataSource } from "index";
import { Repository } from "typeorm";
import { CreatePostDTO } from "./CreatePostDTO";


export class PostUseCase {
  private readonly repository : Repository<Post>;

  constructor() {
    this.repository  = AppDataSource.getRepository(Post);
  }

  async create({description, title, userId} : CreatePostDTO) : Promise<Post> {
    const user = new Post(title, description, userId);

    return await this.repository.save(user);
  }
}
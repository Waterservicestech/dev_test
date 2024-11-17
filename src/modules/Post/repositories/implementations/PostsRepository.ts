import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database/data-source";
import { IPostsRepository } from "../IPostsRepository";
import { ICreatePostDTO } from "../../dto/ICreatePostDTO";
import { Post } from "../../entities/Post";

export class PostsRepository implements IPostsRepository{
    private repository: Repository<Post>;
    private static INSTANCE: PostsRepository;

    private constructor() {
      this.repository = AppDataSource.getRepository(Post);
    }

    static getInstance() {
      if (!this.INSTANCE) {
        this.INSTANCE = new PostsRepository();
      }

      return this.INSTANCE;
    }

    async create({ description, title, user }: ICreatePostDTO): Promise<Post> {
        const postEntityInstance = this.repository.create({ description, title, user })

        const post = await this.repository.save(postEntityInstance)

        return post;
    }
}
import { Repository } from "typeorm";
import { Post } from "../entity/Post";
import { IPostRepository } from "./interface/post.interface.repository";

export class PostRepository implements IPostRepository{
    
    private postRepository: Repository<Post>;

    constructor(repository: Repository<Post>){
        this.postRepository = repository;
    }

    async createPost(post: Post): Promise<Post> {
        return await this.postRepository.save(post);
    }
}
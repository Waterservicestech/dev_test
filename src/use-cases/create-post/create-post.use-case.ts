import { CreatePostDto } from "./create-post.dto";
import { Post } from "../../entity/Post";
import IPostRepository from "../../repository/interface/post.interface.repository";

export class CreatePostUseCase {

    constructor(private readonly postRepository: IPostRepository) {}

    async execute(createPostDto: CreatePostDto) {
        try {
            const newPost = new Post(
                createPostDto.title,
                createPostDto.description,
                createPostDto.userId,
            );

            return await this.postRepository.createPost(newPost);
            
        } catch(err) {
            return err 
        }
    }
}
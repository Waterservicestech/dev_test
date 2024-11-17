import { Post } from "../entities/Post";
import { ICreatePostDTO } from "../dto/ICreatePostDTO";

export interface IPostsRepository {
    create: ({ title, description, user }: ICreatePostDTO) => Promise<Post>;
}
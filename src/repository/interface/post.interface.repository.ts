import { Post } from "../../entity/Post";

export interface IPostRepository {
    createPost(post: Post): Promise<Post>;
}
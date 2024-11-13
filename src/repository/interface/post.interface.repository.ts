import { Post } from "../../entity/Post";

export default interface IPostRepository {
    createPost(post: Post): Promise<Post>;
}
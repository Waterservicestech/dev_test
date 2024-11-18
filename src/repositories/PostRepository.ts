import Post from "../entities/Post";
import IPost from "../interfaces/IPost";
import { AppDataSource } from "../database";

const postRepository = AppDataSource.getRepository(Post);

const getPosts = (): Promise<IPost[]> => {
    return postRepository.find();
}

const createPost = (postData: IPost): Promise<any> => {
    const newPost = postRepository.create(postData);
    return postRepository.save(newPost);
}

export default { getPosts, createPost };
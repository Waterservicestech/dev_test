import { AppDataSource } from "../data-source";
import { Post } from "../entity/Post";
import { NewEntity } from "../interfaces";
import IPost from "../interfaces/iPost";
import { IRepository } from "../interfaces/iRepository";

export default class PostModel implements IRepository<IPost> {
    private model = AppDataSource.getRepository(Post);

    async create(data: NewEntity<IPost>): Promise<IPost> {
        const post = new Post();
        post.title = data.title;
        post.description = data.description;
        post.userId = data.userId;

        await this.model.save(post);
        return post as IPost;
    }
}
import { NewEntity } from "../interfaces";
import IPost from "../interfaces/iPost";
import { IRepository } from "../interfaces/iRepository";
import { ServiceResponse } from "../interfaces/serviceResponse";
import PostModel from "../models/postModel";

export default class PostService {
    constructor(
        private postModel: IRepository<IPost> = new PostModel(),
    ) { }

    public async createPost(post: NewEntity<IPost>): Promise<ServiceResponse<IPost>> {
        const newPost = await this.postModel.create(post);
        return { status: 'CREATED', data: newPost };
    }
}
import { IUsersRepository } from "../../../User/repositories/IUsersRepository";
import { IPostsRepository } from "../../repositories/IPostsRepository";
import { Post } from "../../entities/Post";

import { HttpException } from "../../../../@shared/errors/HttpException";

interface IRequest {
    title: string;
    description: string;
    userId: number;
}

export class CreatePostService {
    constructor(
        private postsRepository: IPostsRepository,
        private userRepository: IUsersRepository
    ) {}

    async execute({ description, title, userId }: IRequest): Promise<Post> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new HttpException('User does not exists', 400)
        }

        const post = await this.postsRepository.create({ title, description, user })

        return post;
    }
}
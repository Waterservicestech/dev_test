import { CreatePostDto, OutputPostDto } from "./create-post.dto";
import { Post } from "../../entity/Post";
import { IPostRepository } from "../../repository/interface/post.interface.repository";
import { IUserRepository } from "../../repository/interface/user.interface.repository";
import { OutputUserDto } from "../create-user/create-user.dto";

export class CreatePostUseCase {

    constructor(
        private readonly postRepository: IPostRepository,
        private readonly userRepository: IUserRepository,
    ) {}

    async execute(createPostDto: CreatePostDto): Promise<OutputUserDto | unknown>{
        try {
            const user = await this.userRepository.findUserById(createPostDto.userId);
            if(user == null) {
                throw new Error('Usuário não encontrado');
            }
            const newPost = new Post(
                createPostDto.title,
                createPostDto.description,
                user,
            );

            const result = await this.postRepository.createPost(newPost); 
            return {
                id: result.id,
                title: result.title,
                description: result.description,
                userId: result.userId.id,
            };
            
        } catch(err) {
            return err; 
        }
    }
}
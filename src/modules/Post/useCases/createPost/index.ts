import { CreatePostController } from "./CreatePost.controller"; 
import { PostsRepository } from "../../repositories/implementations/PostsRepository";
import { UsersRepository } from "../../../User/repositories/implementations/UsersRepository";
import { CreatePostService } from "./CreatePost.service";

const postsRepository = PostsRepository.getInstance();
const userRepository = UsersRepository.getInstance();
const createPostService = new CreatePostService(postsRepository, userRepository)
const createPostController = new CreatePostController(createPostService);

export { createPostController }
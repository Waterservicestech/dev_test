import { DataSource, Repository } from "typeorm";
import Post from "../entity/Post";
import CreatePostDto from "../dto/CreatePostDto";
import UserService from "./UserService";

class PostService {
  private postRepository: Repository<Post>;
  private userService: UserService

  constructor(dataSouce: DataSource) {
    this.postRepository = dataSouce.getRepository(Post);
    this.userService = new UserService(dataSouce)
  }

  async createPost({ title, description, userId }: CreatePostDto): Promise<Post> {
    const user = await this.userService.findUserById(userId)
    const post = this.postRepository.create({ title, description, user });
    return this.postRepository.save(post)
  }
}

export default PostService;
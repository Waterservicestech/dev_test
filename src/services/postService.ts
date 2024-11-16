import { Repository } from "typeorm";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { Result } from "../utils/types";

export type PostConstructorProps = {
  postRepository: Repository<Post>;
  userRepository: Repository<User>;
};

export type CreatePostDTO = {
  title: string;
  description: string;
  userId: number;
};

export class PostService {
  private postRepository: Repository<Post>;
  private userRepository: Repository<User>;

  constructor({ postRepository, userRepository }: PostConstructorProps) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
  }

  async create({
    title,
    description,
    userId,
  }: CreatePostDTO): Promise<Result<Post>> {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) {
        return {
          success: false,
          error: {
            message: "User not exists",
            code: "INVALID_INPUT",
          },
        };
      }

      const post = new Post();

      post.title = title;
      post.description = description;
      post.user = user;

      const savedPost = await this.postRepository.save(post);

      return {
        success: true,
        data: savedPost,
      };
    } catch (error) {
      console.error("Error creating post:", error);
      return {
        success: false,
        error: {
          message: "Internal server error",
          code: "SERVER_ERROR",
        },
      };
    }
  }
}

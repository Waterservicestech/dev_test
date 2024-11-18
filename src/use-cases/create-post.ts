import { Post } from '../entity/Post'
import { PostsRepository } from '../repositories/contracts/posts-repository'
import { UsersRepository } from '../repositories/contracts/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePostUseCaseRequest {
  title: string
  description: string
  userId: number
}

interface CreatePostUseCaseResponse {
  post: Post
}

export class CreatePostUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    title,
    description,
    userId,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const newPost = await this.postsRepository.create({
      title,
      description,
      user,
    })

    return {
      post: newPost,
    }
  }
}

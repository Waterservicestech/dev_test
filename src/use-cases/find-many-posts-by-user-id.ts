import { Post } from '../entity/Post'
import { PostsRepository } from '../repositories/contracts/posts-repository'
import { UsersRepository } from '../repositories/contracts/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindManyPostsByUserIdUseCaseRequest {
  userId: number
}

interface FindManyPostsByUserIdUseCaseResponse {
  postList: Post[]
}

export class FindManyPostsByUserIdUseCase {
  constructor(
    private postsRepository: PostsRepository,
    private userRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: FindManyPostsByUserIdUseCaseRequest): Promise<FindManyPostsByUserIdUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const postList = await this.postsRepository.findManyByUserId(userId)

    return {
      postList,
    }
  }
}

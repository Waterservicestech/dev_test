import { Post } from '../entity/Post'
import { PostsRepository } from '../repositories/contracts/posts-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindPostByIdUseCaseRequest {
  id: number
}

interface FindPostByIdUseCaseResponse {
  post: Post
}

export class FindPostByIdUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    id,
  }: FindPostByIdUseCaseRequest): Promise<FindPostByIdUseCaseResponse> {
    const post = await this.postsRepository.findById(id)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    return {
      post,
    }
  }
}

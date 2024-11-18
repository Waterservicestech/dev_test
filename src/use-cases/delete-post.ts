import { PostsRepository } from '../repositories/contracts/posts-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeletePostUseCaseRequest {
  id: number
}

interface DeletePostUseCaseResponse {}

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    id,
  }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {
    const post = await this.postsRepository.findById(id)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    await this.postsRepository.delete(id)

    return {}
  }
}

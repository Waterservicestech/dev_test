import { PostsTypeOrmRepository } from '../../repositories/type-orm/posts-type-orm-repository'
import { DeletePostUseCase } from '../delete-post'

export function makeDeletePostUseCase() {
  const postRepository = new PostsTypeOrmRepository()

  const useCase = new DeletePostUseCase(postRepository)

  return useCase
}

import { PostsTypeOrmRepository } from '../../repositories/type-orm/posts-type-orm-repository'
import { UpdatePostUseCase } from '../update-post'

export function makeUpdatePostUseCase() {
  const postRepository = new PostsTypeOrmRepository()
  const useCase = new UpdatePostUseCase(postRepository)

  return useCase
}

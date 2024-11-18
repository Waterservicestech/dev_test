import { PostsTypeOrmRepository } from '../../repositories/type-orm/posts-type-orm-repository'
import { FindPostByIdUseCase } from '../find-post-by-id'

export function makeFindPostByIdUseCase() {
  const postRepository = new PostsTypeOrmRepository()
  const useCase = new FindPostByIdUseCase(postRepository)

  return useCase
}

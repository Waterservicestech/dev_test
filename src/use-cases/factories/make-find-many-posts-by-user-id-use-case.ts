import { PostsTypeOrmRepository } from '../../repositories/type-orm/posts-type-orm-repository'
import { UsersTypeOrmRepository } from '../../repositories/type-orm/users-type-orm-repository'
import { FindManyPostsByUserIdUseCase } from '../find-many-posts-by-user-id'

export function makeFindManyPostsByUserIdUseCase() {
  const postRepository = new PostsTypeOrmRepository()
  const userRepository = new UsersTypeOrmRepository()

  const useCase = new FindManyPostsByUserIdUseCase(
    postRepository,
    userRepository,
  )

  return useCase
}

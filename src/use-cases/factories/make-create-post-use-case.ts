import { PostsTypeOrmRepository } from '../../repositories/type-orm/posts-type-orm-repository'
import { UsersTypeOrmRepository } from '../../repositories/type-orm/users-type-orm-repository'
import { CreatePostUseCase } from '../create-post'

export function makeCreatePostUseCase() {
  const postRepository = new PostsTypeOrmRepository()
  const usersRepository = new UsersTypeOrmRepository()

  const useCase = new CreatePostUseCase(postRepository, usersRepository)

  return useCase
}

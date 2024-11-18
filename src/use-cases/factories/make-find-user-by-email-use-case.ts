import { UsersTypeOrmRepository } from '../../repositories/type-orm/users-type-orm-repository'
import { FindUserByEmailUseCase } from '../find-user-by-email'

export function makeFindUserByEmailUseCase() {
  const userRepository = new UsersTypeOrmRepository()
  const useCase = new FindUserByEmailUseCase(userRepository)

  return useCase
}

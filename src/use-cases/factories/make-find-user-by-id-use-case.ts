import { UsersTypeOrmRepository } from '../../repositories/type-orm/users-type-orm-repository'
import { FindUserByIdUseCase } from '../find-user-by-id'

export function makeFindUserByIdUseCase() {
  const userRepository = new UsersTypeOrmRepository()
  const useCase = new FindUserByIdUseCase(userRepository)

  return useCase
}

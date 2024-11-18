import { UsersTypeOrmRepository } from '../../repositories/type-orm/users-type-orm-repository'
import { CreateUserUseCase } from '../create-user'

export function makeCreateUserUseCase() {
  const userRepository = new UsersTypeOrmRepository()
  const useCase = new CreateUserUseCase(userRepository)

  return useCase
}

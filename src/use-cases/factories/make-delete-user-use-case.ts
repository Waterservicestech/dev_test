import { UsersTypeOrmRepository } from '../../repositories/type-orm/users-type-orm-repository'
import { DeleteUserUseCase } from '../delete-user'

export function makeDeleteUserUseCase() {
  const userRepository = new UsersTypeOrmRepository()
  const useCase = new DeleteUserUseCase(userRepository)

  return useCase
}

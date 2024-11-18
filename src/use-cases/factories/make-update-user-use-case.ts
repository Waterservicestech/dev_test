import { UsersTypeOrmRepository } from '../../repositories/type-orm/users-type-orm-repository'
import { UpdateUserUseCase } from '../update-user'

export function makeUpdateUserUseCase() {
  const usersRepository = new UsersTypeOrmRepository()
  const useCase = new UpdateUserUseCase(usersRepository)

  return useCase
}

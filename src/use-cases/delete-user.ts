import { UsersRepository } from '../repositories/contracts/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteUserUseCaseRequest {
  id: number
}

interface DeleteUserUseCaseResponse {}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.delete(id)

    return {}
  }
}

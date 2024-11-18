import { UsersRepository } from '../repositories/contracts/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface UpdateUserUseCaseRequest {
  id: number
  firstName: string
  lastName: string
  email: string
}

interface UpdateUserUseCaseResponse {}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
    firstName,
    lastName,
    email,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    await this.usersRepository.update(id, {
      firstName,
      lastName,
      email,
    })

    return {}
  }
}

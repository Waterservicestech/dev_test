import { User } from '../entity/User'
import { UsersRepository } from '../repositories/contracts/users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindUserByEmailUseCaseRequest {
  email: string
}

interface FindUserByEmailUseCaseResponse {
  user: User
}

export class FindUserByEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: FindUserByEmailUseCaseRequest): Promise<FindUserByEmailUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}

import { User } from '../entity/User'
import { UsersRepository } from '../repositories/contracts/users-repository'

interface CreateUserUseCaseRequest {
  firstName: string
  lastName: string
  email: string
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    firstName,
    lastName,
    email,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const newUser = await this.usersRepository.create({
      firstName,
      lastName,
      email,
    })

    return {
      user: newUser,
    }
  }
}

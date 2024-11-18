import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FindUserByEmailUseCase } from './find-user-by-email'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: UsersInMemoryRepository
let sut: FindUserByEmailUseCase // System Under Test

describe('Find user by email use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new FindUserByEmailUseCase(usersRepository)

    await usersRepository.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
    })
  })

  it('should be able to find an user by email', async () => {
    const { user } = await sut.execute({ email: 'test@test.com' })

    expect(user.email).toEqual('test@test.com')
  })

  it('should throw an error when email is invalid', async () => {
    await expect(() =>
      sut.execute({ email: 'invalid@email.com' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

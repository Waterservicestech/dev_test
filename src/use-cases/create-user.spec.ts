import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateUserUseCase } from './create-user'

let usersRepository: UsersInMemoryRepository
let sut: CreateUserUseCase // System Under Test

describe('Create user use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new CreateUserUseCase(usersRepository)
  })

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
    })

    expect(user.id).toEqual(expect.any(Number))
    expect(user.email).toEqual('test@test.com')
  })
})

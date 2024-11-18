import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FindUserByIdUseCase } from './find-user-by-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: UsersInMemoryRepository
let sut: FindUserByIdUseCase // System Under Test

describe('Find user by id use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new FindUserByIdUseCase(usersRepository)

    await usersRepository.create({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
    })
  })

  it('should be able to find an user by id', async () => {
    const { user } = await sut.execute({ id: 1 })

    expect(user.id).toEqual(1)
    expect(user.firstName).toEqual('John')
    expect(user.lastName).toEqual('Doe')
  })

  it('should throw an error when id is invalid', async () => {
    await expect(() => sut.execute({ id: 2 })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})

import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { DeleteUserUseCase } from './delete-user'

let usersRepository: UsersInMemoryRepository
let sut: DeleteUserUseCase // System Under Test

describe('Delete user use case', () => {
  beforeEach(async () => {
    usersRepository = new UsersInMemoryRepository()
    sut = new DeleteUserUseCase(usersRepository)

    await usersRepository.create({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test1@test.com',
    })

    await usersRepository.create({
      id: 2,
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'test2@test.com',
    })
  })

  it('should be able to delete an user', async () => {
    await sut.execute({ id: 1 })

    expect(usersRepository.items).toHaveLength(1)
  })

  it('should throw an error when id is invalid', async () => {
    await expect(() => sut.execute({ id: 3 })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})

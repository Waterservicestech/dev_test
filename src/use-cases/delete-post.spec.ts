import { PostsInMemoryRepository } from '../repositories/in-memory/posts-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { DeletePostUseCase } from './delete-post'
import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'
import { User } from '../entity/User'

let postsRepository: PostsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let sut: DeletePostUseCase // System Under Test

describe('Delete post use case', () => {
  beforeEach(async () => {
    postsRepository = new PostsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository()
    sut = new DeletePostUseCase(postsRepository)

    const user = new User()
    user.id = 1

    await usersRepository.create({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
    })

    await postsRepository.create({
      id: 1,
      title: 'Void title',
      description: 'Void description',
      user,
    })

    await postsRepository.create({
      id: 2,
      title: 'Void title',
      description: 'Void description',
      user,
    })
  })

  it('should be able to delete an post', async () => {
    await sut.execute({ id: 1 })

    expect(postsRepository.items).toHaveLength(1)
  })

  it('should throw an error when id is invalid', async () => {
    await expect(() => sut.execute({ id: 3 })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})

import { PostsInMemoryRepository } from '../repositories/in-memory/posts-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { UpdatePostUseCase } from './update-post'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'
import { User } from '../entity/User'

let postsRepository: PostsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let sut: UpdatePostUseCase // System Under Test

describe('Update post use case', () => {
  beforeEach(async () => {
    postsRepository = new PostsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository()
    sut = new UpdatePostUseCase(postsRepository)

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
  })

  it('should be able to update a post', async () => {
    await sut.execute({
      id: 1,
      title: 'Filled title',
      description: 'Filled description',
    })

    expect(postsRepository.items[0].title).toEqual('Filled title')
    expect(postsRepository.items[0].description).toEqual('Filled description')
    expect(postsRepository.items[0].updatedAt).toEqual(expect.any(Date))
  })

  it('should throw an error when id is invalid', async () => {
    await expect(() =>
      sut.execute({
        id: 2,
        title: 'Filled title',
        description: 'Filled description',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

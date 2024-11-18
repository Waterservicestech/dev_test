import { PostsInMemoryRepository } from '../repositories/in-memory/posts-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'
import { FindManyPostsByUserIdUseCase } from './find-many-posts-by-user-id'
import { User } from '../entity/User'

let postsRepository: PostsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let sut: FindManyPostsByUserIdUseCase // System Under Test

describe('Find many posts by user id use case', () => {
  beforeEach(async () => {
    postsRepository = new PostsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository()

    sut = new FindManyPostsByUserIdUseCase(postsRepository, usersRepository)

    const user = new User()
    user.id = 1

    await usersRepository.create({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test1@test.com',
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

  it('should be able to find many posts by user id', async () => {
    const { postList } = await sut.execute({ userId: 1 })

    expect(postList).toHaveLength(2)
  })

  it('should throw an error when user id is invalid', async () => {
    await expect(() => sut.execute({ userId: 2 })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})

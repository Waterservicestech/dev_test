import { PostsInMemoryRepository } from '../repositories/in-memory/posts-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FindPostByIdUseCase } from './find-post-by-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'
import { User } from '../entity/User'

let postsRepository: PostsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let sut: FindPostByIdUseCase // System Under Test

describe('Find post by id use case', () => {
  beforeEach(async () => {
    postsRepository = new PostsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository()

    sut = new FindPostByIdUseCase(postsRepository)

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
  })

  it('should be able to find an post by id', async () => {
    const { post } = await sut.execute({ id: 1 })

    expect(post.id).toEqual(1)
    expect(post.title).toEqual('Void title')
    expect(post.description).toEqual('Void description')
  })

  it('should throw an error when id is invalid', async () => {
    await expect(() => sut.execute({ id: 2 })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})

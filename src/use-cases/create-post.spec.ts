import { PostsInMemoryRepository } from '../repositories/in-memory/posts-in-memory-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePostUseCase } from './create-post'
import { UsersInMemoryRepository } from '../repositories/in-memory/users-in-memory-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let postsRepository: PostsInMemoryRepository
let usersRepository: UsersInMemoryRepository
let sut: CreatePostUseCase // System Under Test

describe('Create post use case', () => {
  beforeEach(async () => {
    postsRepository = new PostsInMemoryRepository()
    usersRepository = new UsersInMemoryRepository()
    sut = new CreatePostUseCase(postsRepository, usersRepository)

    await usersRepository.create({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@test.com',
    })
  })

  it('should be able to create a new post', async () => {
    const { post } = await sut.execute({
      title: 'Void title',
      description: 'Void description',
      userId: 1,
    })

    expect(post.id).toEqual(expect.any(Number))
    expect(post.title).toEqual('Void title')
  })

  it('should throw an error when user do not exist', async () => {
    await expect(() =>
      sut.execute({
        title: 'Void title',
        description: 'Void description',
        userId: 2,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

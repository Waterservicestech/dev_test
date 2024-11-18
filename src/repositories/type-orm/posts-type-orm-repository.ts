import { Repository } from 'typeorm'
import { Post } from '../../entity/Post'
import { AppDataSource } from '../../data-source'
import {
  CreatePost,
  UpdatePost,
  PostsRepository,
} from '../contracts/posts-repository'

export class PostsTypeOrmRepository implements PostsRepository {
  private postRepository: Repository<Post>

  constructor() {
    this.postRepository = AppDataSource.getRepository(Post)
  }

  async create(data: CreatePost) {
    const newPost = this.postRepository.create({
      title: data.title,
      description: data.description,
      user: data.user,
    })

    await this.postRepository.save(newPost)

    return newPost
  }

  async findById(id: number) {
    const post = await this.postRepository.findOneBy({ id })

    return post
  }

  async findManyByUserId(userId: number) {
    const postList = await this.postRepository.findBy({ user: { id: userId } })

    return postList
  }

  async update(id: number, data: UpdatePost) {
    await this.postRepository.update(id, { ...data })
  }

  async delete(id: number) {
    await this.postRepository.delete(id)
  }
}

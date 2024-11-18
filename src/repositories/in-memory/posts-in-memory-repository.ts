import { Post } from '../../entity/Post'
import {
  CreatePost,
  PostsRepository,
  UpdatePost,
} from '../contracts/posts-repository'

export class PostsInMemoryRepository implements PostsRepository {
  public items: Post[] = []
  private currentId = 1

  async create(data: CreatePost) {
    const post = new Post()

    post.id = data.id ?? this.currentId++
    post.title = data.title
    post.description = data.description
    post.user = data.user
    post.createdAt = data.createdAt ?? new Date()

    this.items.push(post)

    return post
  }

  async findById(id: number) {
    const post = this.items.find((item) => item.id === id)

    if (!post) {
      return null
    }

    return post
  }

  async findManyByUserId(userId: number) {
    const posts = this.items.filter((item) => item.user.id === userId)

    return posts
  }

  async update(id: number, data: UpdatePost) {
    const postIndex = this.items.findIndex((item) => item.id === id)

    this.items[postIndex].title = data.title
    this.items[postIndex].description = data.description
    this.items[postIndex].updatedAt = new Date()
  }

  async delete(id: number) {
    const postIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(postIndex, 1)
  }
}

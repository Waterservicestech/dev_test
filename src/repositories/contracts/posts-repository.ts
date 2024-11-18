import { Post } from '../../entity/Post'
import { User } from '../../entity/User'

export interface CreatePost {
  id?: number
  title: string
  description: string
  user: User
  createdAt?: Date
  updatedAt?: Date
}

export interface UpdatePost {
  title: string
  description: string
}

export interface PostsRepository {
  create(data: CreatePost): Promise<Post>
  findById(id: number): Promise<Post | null>
  findManyByUserId(userId: number): Promise<Post[]>
  update(id: number, data: UpdatePost): Promise<void>
  delete(id: number): Promise<void>
}

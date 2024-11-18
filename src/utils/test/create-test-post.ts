import { AppDataSource } from '../../data-source'
import { Post } from '../../entity/Post'
import { createTestUser } from './create-test-user'

export interface CreateTestPost {
  id?: number
  title?: string
  description?: string
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Cria um post de teste no banco de dados.
 *
 * @param data Dados opcionais para personalizar o post.
 * @returns O objeto do post criado.
 */

export async function createTestPost(data: CreateTestPost = {}) {
  const postRepository = AppDataSource.getRepository(Post)

  const user = await createTestUser()

  const newPost = postRepository.create({
    title: data.title ?? 'Void title',
    description: data.description ?? 'Void description',
    user,
  })

  await postRepository.save(newPost)

  return newPost
}

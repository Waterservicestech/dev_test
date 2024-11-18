import { AppDataSource } from '../../data-source'
import { User } from '../../entity/User'

export interface CreateTestUser {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Cria um usuário de teste no banco de dados.
 *
 * @param data Dados opcionais para personalizar o usuário.
 * @returns O objeto do usuário criado.
 */

export async function createTestUser(data: CreateTestUser = {}) {
  const userRepository = AppDataSource.getRepository(User)

  const newUser = userRepository.create({
    firstName: data.firstName ?? 'John',
    lastName: data.lastName ?? 'Doe',
    email: data.email ?? 'test@test.com',
  })

  await userRepository.save(newUser)

  return newUser
}

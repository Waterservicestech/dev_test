import { User } from '../../entity/User'

export interface CreateUser {
  id?: number
  firstName: string
  lastName: string
  email: string
  createdAt?: Date
  updatedAt?: Date
}

export interface UpdateUser {
  firstName: string
  lastName: string
  email: string
}

export interface UsersRepository {
  create(data: CreateUser): Promise<User>
  findById(id: number): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  update(id: number, data: UpdateUser): Promise<void>
  delete(id: number): Promise<void>
}

import { User } from '../../entity/User'
import {
  CreateUser,
  UpdateUser,
  UsersRepository,
} from '../contracts/users-repository'

export class UsersInMemoryRepository implements UsersRepository {
  public items: User[] = []
  private currentId = 1

  async create(data: CreateUser) {
    const user = new User()

    user.id = data.id ?? this.currentId
    user.firstName = data.firstName
    user.lastName = data.lastName
    user.email = data.email
    user.createdAt = data.createdAt ?? new Date()

    this.items.push(user)

    return user
  }

  async findById(id: number) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async update(id: number, data: UpdateUser) {
    const userIndex = this.items.findIndex((item) => item.id === id)

    this.items[userIndex].firstName = data.firstName
    this.items[userIndex].lastName = data.lastName
    this.items[userIndex].email = data.email
    this.items[userIndex].updatedAt = new Date()
  }

  async delete(id: number) {
    const userIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(userIndex, 1)
  }
}

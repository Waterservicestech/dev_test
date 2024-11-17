import { ICreateUserDTO } from "../dto/ICreateUserDTO"
import { User } from "../entities/User"

export interface IUsersRepository {
    create: ({ firstName, lastName, email }: ICreateUserDTO) => Promise<User>
    findById: (userId: number) => Promise<User | null>
    findByEmail: (email: string) => Promise<User | null>
}
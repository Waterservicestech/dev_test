import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

//TODO Crie a entidade de User
interface UserInterface {
    id?: number
    firstName: string
    lastName: string
    email: string
    posts?: Post[]
}

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    firstName: string = '' 

    @Column()
    lastName: string = ''

    @Column({ unique: true })
    email: string = ''

    @OneToMany(() => Post, (post) => post.user)
    posts?: Post[]

    constructor(data?: UserInterface) {
        if (data) {
            Object.assign(this, data)
        }
    }
}
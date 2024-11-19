import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post
interface PostInterface {
    id?: number
    title: string
    description: string
    user: User
}

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title: string = ''

    @Column()
    description: string = ''

    @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE'})
    user!: User

    constructor(data?: PostInterface) {
        if (data) {
            Object.assign(this, data)
        }
    }
}
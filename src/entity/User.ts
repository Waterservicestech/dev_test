import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({length: 100, nullable: false})
    firstName!: string

    @Column({length: 100, nullable: false})
    lastName!: string

    @Column({length: 100, nullable: false})
    email!: string

    @OneToMany(() => Post, (post) => post.user)
    posts!: Post[]
}

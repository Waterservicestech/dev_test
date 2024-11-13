import { Entity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Post } from "./Post";
//TODO Crie a entidade de User
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ length: 100, unique: true })
    email: string;

    @OneToMany(() => Post, post => post.user)
    posts: Post[];
}

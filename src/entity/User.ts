import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

//TODO Crie a entidade de User
@Entity({ name: "user" })
export class User {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, length: 100 })
    firstName!: string;

    @Column({ nullable: false, length: 100 })
    lastName!: string;

    @Column({ nullable: false, length: 100 })
    email!: string;

    @OneToMany(() => Post, (post) => post.userId)
    post!: Post[];
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({type: "varchar", length: 100, nullable: false})
    title: string = "";

    @Column({type: "varchar", length: 100, nullable: false})
    description: string = "";

    @Column({type: "varchar", length: 100, nullable: false})
    email: string = "";

    @OneToMany(() => Post, (post) => post.user, {cascade: true})
    posts: Post[] = [];
}

//TODO Crie a entidade de User

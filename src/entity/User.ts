import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({type: "varchar", length: 100, nullable: false})
    firstName: string = "";

    @Column({type: "varchar", length: 100, nullable: false})
    lastName: string = "";

    @Column({type: "varchar", length: 100, nullable: false})
    email: string = "";

    @OneToMany(() => Post, (post) => post.user, {cascade: true})
    posts: Post[] = []; //um para muitos
}

//TODO Crie a entidade de User

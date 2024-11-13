import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post
@Entity({ name: 'posts' })
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'title', length: 100, nullable: false })
    title: string;

    @Column({ name: 'description', length: 100, nullable: false })
    description: string;

    @ManyToOne(() => User, (user) => user.posts)
    userId: User;

    constructor(title: string, description: string, userId: User) {
        this.title = title;
        this.description = description;
        this.userId = userId;
    }
}

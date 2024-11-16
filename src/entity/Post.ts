import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

//TODO Crie a entidade de Post
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    description!: string;

    @ManyToOne(() => User, user => user.posts)
    user!: User;
}

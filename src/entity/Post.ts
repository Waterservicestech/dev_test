import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 100})
    description: string;

    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    user: User;
}
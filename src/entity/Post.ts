import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "title", type: "varchar", length: 100, nullable: false })
    title!: string;

    @Column({ name: "description", type: "varchar", length: 100, nullable: false })
    description!: string;

    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({name: "user_id"})
    user!: User;
}
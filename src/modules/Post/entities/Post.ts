import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../User/entities/User";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    title!: string

    @Column()
    description!: string

    @ManyToOne(() => User, user => user.posts)
    user!: User;
}
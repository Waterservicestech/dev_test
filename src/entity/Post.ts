import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

//TODO Crie a entidade de Post
import { User } from './User';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    title!: string;

    @Column({ type: 'varchar', length: 100 })
    description!: string;

    @ManyToOne(() => User, (user: { posts: any; }) => user.posts)
    user!: User;
}


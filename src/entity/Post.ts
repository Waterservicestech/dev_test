import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

//TODO Crie a entidade de Post
import { User } from './User';

@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    title!: string;

    @Column({ type: "varchar", length: 100, nullable: false })
    description!: string;

    @Column({ type: "int", nullable: false, })
    userId!: number;

    @JoinColumn({ name: "userId" })
    @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
    user!: User;
}
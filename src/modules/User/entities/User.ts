import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Post } from "../../Post/entities/Post";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @OneToMany(() => Post, posts => posts.user, { onDelete: 'CASCADE' })
    posts?: Post[];
}
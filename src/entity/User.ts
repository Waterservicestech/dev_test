import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Post } from './Post';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 100})
    firstName: string;

    @Column({type: 'varchar', length: 100})
    lastName: string;

    @Column({type: 'varchar', length: 100, unique: true})
    email: string;

    @OneToMany(() => Post, (post: Post) => post.userId)
    posts!: Post[];

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
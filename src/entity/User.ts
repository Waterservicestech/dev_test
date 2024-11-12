import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

//TODO Crie a entidade de User
import { Post } from './Post';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100 })
    firstName!: string;

    @Column({ type: 'varchar', length: 100 })
    lastName!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string;

    @OneToMany(() => Post, (post: { user: any; }) => post.user)
    posts!: Post[];
}


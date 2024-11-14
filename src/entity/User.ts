import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    firstName!: string;

    @Column({ type: "varchar", length: 100 })
    lastName!: string;

    @Column({ type: "varchar", length: 100, unique: true })
    email!: string;

    // Estabelecendo a relação 'um para muitos' com Post
    @OneToMany(() => Post, (post) => post.user)
    posts!: Post[];
}
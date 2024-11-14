import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    title: string;

    @Column({ type: "varchar", length: 100 })
    description: string;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    constructor(title: string, description: string, user: User) {
        this.title = title;
        this.description = description;
        this.user = user;
    }
}

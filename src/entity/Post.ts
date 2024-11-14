import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    title!: string;

    @Column({ type: "varchar", length: 100 })
    description!: string;

    // Establish a many-to-one relationship with the User entity
    @ManyToOne(() => User, (user) => user.posts)
    user!: User;
}
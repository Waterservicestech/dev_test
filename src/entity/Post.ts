import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User"

@Entity('post')
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    title: string;

    @Column({length: 100, nullable: false})
    description: string;

    @ManyToOne(() => User, (user) => user.id, onDelete: "CASCADE")
    userId: User


}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar", nullable: false, length: 100})
    title!: string

    @Column({type: "varchar", nullable: false, length: 100})
    description!: string

    @ManyToOne(() => User, (user) => user.posts, {nullable: false})
    @JoinColumn({ name: 'userId' })
    user?: User

    @Column({ nullable: true })
    userId?: number;
}
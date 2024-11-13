import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    id!: number
    @Column({type: 'varchar', length: 100, nullable: false})
    title!: string
    @Column({type: 'varchar', length: 100, nullable: false})
    description!: string
    @Column({type: 'number', nullable: false})
    userId!: number

    @ManyToOne(() => User, (user) => user.posts, {onDelete: 'CASCADE'})
    user!: User
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: 100 })
    title: string;

    @Column({type: 'varchar', length: 100})
    description: string;

    @ManyToOne(() => User, (user: User) => user.posts, { onDelete: 'CASCADE'})
    @JoinColumn({ name: 'userId'})
    user!: User;

    @Column()
    userId: number;

    constructor(title: string, description: string, userId: number) {
        this.title = title;
        this.description = description;
        this.userId = userId;
    }
}
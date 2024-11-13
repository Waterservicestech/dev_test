import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";


@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    constructor( title: string, description: string, user: User) {

        this.title = title;
        this.description = description;
        this.user = user;
    }
}
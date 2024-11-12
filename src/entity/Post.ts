import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";


@Entity('post')
export class Post{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    title: string;

    @Column({length: 100, nullable: false})
    description: string;

    @ManyToOne(() => User,{nullable: false})
    @JoinColumn({ name: 'userId', })
    user: User

    constructor(id:number, title: string, description: string,user: User) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.user = user;
    }
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import { User } from "./User";
import { join } from "path";

//TODO Crie a entidade de Post

@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!:string

    @Column()
    description!:string

    @Column()
    userId!:number

    @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User;

}
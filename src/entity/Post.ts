import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post
@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: "varchar", length: 100})
    title!:string

    @Column({type: "varchar", length: 100})
    description!:string

    @ManyToMany(() => User, (user) => user.post, {nullable: false})

    @JoinColumn({name:"userId"})

    user!:User

    constructor(title:string, description:string, user:User){

        this.title = title;
        this.description = description;
        this.user = user;
    }
}

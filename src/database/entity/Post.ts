import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {User} from "./User";

//TODO Crie a entidade de Post
@Entity("post")
export  class Post{
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column("varchar", {length: 100})
    title!: string

    @Column("varchar")
    description!: string

    @Column("int")
    userId!: number

    user!: User
}
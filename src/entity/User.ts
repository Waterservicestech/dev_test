import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import Post from "./Post";

@Entity()
@Unique(["email"])
export default class User {
    @PrimaryGeneratedColumn()
    id!:number

    @Column({type: 'varchar', length: 100, nullable: false})
    firstName!: string

    @Column({type: 'varchar', length: 100, nullable: false})
    lastName!: string

    @OneToMany(() => Post, (post) => post.user)
    posts?: Post[]

    @Column({type: 'varchar', length: 100, nullable: false})
    email!: string
}

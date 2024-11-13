import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Post from "./Post";

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!:number
    @Column({type: 'varchar', length: 100, nullable: false})
    public firstName!: string
    @Column({type: 'varchar', length: 100, nullable: false})
    public lastName!: string
    @OneToMany(() => Post, (post) => post.user)
    posts?: Post[]
    @Column({type: 'varchar', length: 100, nullable: false})
    public email!: string
}

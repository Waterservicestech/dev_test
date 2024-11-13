import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {Post} from "./Post"

//TODO Crie a entidade de User
@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({type: "varchar", length: 100})
    firstName!:string

    @Column({type: "varchar", length: 100})
    lastName!:string

    @Column({type: "varchar", length: 100, unique:true})
    email!:string

    @OneToMany(() => Post, (post) => post.user)
    post!: Post[];

    constructor(firstName:string, lastName:string, email:string){

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}

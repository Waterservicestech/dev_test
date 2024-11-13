import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

//TODO Crie a entidade de User
@Entity({ name: 'users'} )
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'firstName', length: 100, nullable: false })
    firstName: string;

    @Column({ name: 'lastName', length: 100, nullable: false })
    lastName: string;

    @Column({ name: 'email', length: 100, nullable: false })
    email: string;

    @OneToMany(() => Post, (post) => post.userId)
    posts?: Post[]

    constructor(firstName: string, lastName: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
/*
id – Tipo: Int, autoincremental, chave primária (PK).
firstName – Tipo: Varchar(100), não nulo.
lastName – Tipo: Varchar(100), não nulo.
email – Tipo: Varchar(100), não nulo.
*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post
@Entity({ name: "post" })
export class Post {
    // define a chave primária como auto incremento
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 100 })
    title: string;

    @Column({ nullable: false, length: 100 })
    description: string;

    @ManyToOne(() => User, (user) => user.post)
    userId: User;

}
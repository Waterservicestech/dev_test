import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
//TODO Crie a entidade de Post

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column({type: "varchar", length: 100, nullable: false})
    title: string = "";

    @Column({type: "varchar", length: 100, nullable: false})
    description: string = "";

    @ManyToOne(() => User, (user) => user.posts, {onDelete: "CASCADE"})
    user!: User; //muitos para um '!' obrigartorio
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post
{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({type: "varchar", length: 100, nullable: false})
    title!: string;

    @Column({type: "varchar", length: 100, nullable: false})
    description!: string;

    @ManyToOne(() => User, (user: User) => user.id)
    @Column({type: "int", nullable: false})
    userId!: number;
}
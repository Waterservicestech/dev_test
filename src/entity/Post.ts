import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post
@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id?: number;
    
    @Column({type: "varchar", length: 100, nullable: false })
    title!: string;
    
    @Column({type: "varchar", length: 100, nullable: false })
    description: string | undefined
    
    @ManyToOne(() => User, (userId) => userId.posts, { nullable: false })
    userId?: User;
  
}

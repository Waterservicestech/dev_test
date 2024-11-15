import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity() 
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column()
    firstName!: string;

  @Column()
    lastName!: string;

  @Column({ unique: true })
    email!: string;


  @OneToMany(() => Post, (post) => post.user)
    posts!: Post[];
}

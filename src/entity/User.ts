import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

//TODO Crie a entidade de User
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  firstName!: string;

  @Column({ length: 100 })
  lastName!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @OneToMany(() => Post, (post: Post) => post.user)
  posts!: Post[];
}

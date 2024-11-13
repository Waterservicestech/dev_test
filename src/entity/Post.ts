import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

export interface postData {
  //all should also be mandatory, title and description should also be at most 100 char, user is its id field:
  title: string;
  description: string;
  userId: number;
}
//TODO Crie a entidade de Post
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title!: string;

  @Column({ length: 100 })
  description!: string;

  @ManyToOne(() => User, (user: User) => user.posts, { onDelete: "CASCADE" })
  user!: User;
}

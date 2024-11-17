import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

//TODO Crie a entidade de Post
@Entity()
class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.id, { nullable: false, onDelete: "CASCADE" })
  user: User;
}

export default Post;
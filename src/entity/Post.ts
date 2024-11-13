import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100, nullable: false, type: "varchar" })
  title!: string;

  @Column({ length: 100, nullable: false, type: "varchar" })
  description!: string;

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;
}

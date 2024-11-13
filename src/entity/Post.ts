import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post

@Entity()
export class Post{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", {length: 100})
  title!: string;

  @Column("varchar", {length: 100})
  description!: string;

  @OneToOne(() => User, user => user.post)
  @JoinColumn()
  user!: User;
}
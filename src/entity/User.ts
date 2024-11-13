import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Post } from "./Post";

//TODO Crie a entidade de User

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("varchar", {length: 100})
  firstName!: string;

  @Column("varchar", {length: 100})
  lastName!: string;

  @Column("varchar", {length: 100})
  email!: string;

  @OneToOne(() => Post, post => post.user)
  post?: Post;
}
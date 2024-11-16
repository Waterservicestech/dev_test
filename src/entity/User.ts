import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from './Post';

//TODO Crie a entidade de User
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @OneToMany(() => Post, post => post.user)
  posts!: Post[]
}
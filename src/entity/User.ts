import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './Post';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 100 })
  email: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    posts: Post[]
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.posts = posts;
  }
}

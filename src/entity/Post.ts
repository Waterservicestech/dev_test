import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  constructor(title: string, user: User) {
    this.title = title;
    this.user = user;
  }
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './postsEntity';

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

  // Relacionamento OneToMany com a tabela de posts
  @OneToMany(() => Post, post => post.user)
  posts!: Post[];
}
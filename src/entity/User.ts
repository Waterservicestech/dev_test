//TODO Crie a entidade de User
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './Post';  // Importando a entidade Post

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  // Relacionamento "um para muitos" com a tabela Post
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}

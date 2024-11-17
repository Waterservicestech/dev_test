//TODO Crie a entidade de Post
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';  // Importando a entidade User

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  // Relacionamento "muitos para um" com a tabela User
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}

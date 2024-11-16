import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './usersEntity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  // Relacionamento ManyToOne com a tabela de usuários (um usuário pode ter muitos posts)
  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
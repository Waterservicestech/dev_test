//TODO Crie a entidade de Post
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 100 })
  title?: string;

  @Column({ type: 'varchar', length: 100 })
  description?: string;

  @Column()
  userId?: number;

  @ManyToOne(() => User, user => user.posts)
  user?: User;
}
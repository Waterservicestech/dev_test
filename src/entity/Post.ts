import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from './User';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 200 })
  title: string = '';

  @Column({ type: 'text' })
  content: string = '';

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;
}

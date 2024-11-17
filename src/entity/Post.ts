import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

//TODO Crie a entidade de Post
import { User } from './User';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn({name: 'id'})
  id!: number;

  @Column({ name: 'title', type: 'varchar', length: 100 })
  title!: string;

  @Column({ name: 'description',type: 'varchar', length: 100 })
  description!: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user!: User;
}
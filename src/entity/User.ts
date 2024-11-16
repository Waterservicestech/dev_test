import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from './Post'; 

@Entity('user') 
export class User {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar', length: 100 })
  firstName: string | undefined;

  @Column({ type: 'varchar', length: 100 })
  lastName: string | undefined;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string | undefined;

  
  @OneToMany(() => Post, post => post.user) 
  posts: Post[] | undefined;
}
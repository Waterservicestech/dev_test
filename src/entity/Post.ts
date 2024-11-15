import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity({name: 'post'})
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })  
  user!: User;

  constructor(title: string, description: string, userId: number) {
    this.title = title;
    this.description = description;
    this.userId = userId;
  }
}
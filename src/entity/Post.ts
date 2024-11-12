import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from './User';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @ManyToOne(() => User,{nullable: false})
    @JoinColumn({ name: 'userId', })
    user: User

  constructor(id: number, title: string, content: string, user: User) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.user = user;
  }
}

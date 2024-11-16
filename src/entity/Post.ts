import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from './User'; 
@Entity('post') 
export class Post {
  @PrimaryGeneratedColumn()
  id: number | undefined;

  @Column({ type: 'varchar', length: 100 })
  title: string | undefined;

  @Column({ type: 'varchar', length: 100 })
  description: string | undefined;


  @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
  user: User | undefined;
}


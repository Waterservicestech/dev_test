import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from './User';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'varchar', length: 100 })
  description!: string;

  @ManyToOne(() => User, (user) => user.posts, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_user_post' })
  user!: User;
}
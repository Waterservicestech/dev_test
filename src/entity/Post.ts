import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  title: string = "";

  @Column()
  description: string = "";

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user: User = {} as User;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
    title!: string;

  @Column({ length: 100 })
    description!: string;

  @ManyToOne(() => User)
    @JoinColumn({ name: "userId" })
    user!: User;
}

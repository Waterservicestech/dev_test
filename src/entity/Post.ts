import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column("text")
  description!: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: "SET NULL" })
  user!: User;
}

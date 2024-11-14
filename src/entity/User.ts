import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

export interface userData {
  firstName: string;
  lastName: string;
  email: string;
}

//TODO Crie a entidade de User
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "first_name", type: "varchar", length: 100, nullable: false })
  firstName!: string;

  @Column({ name: "last_name", type: "varchar", length: 100, nullable: false })
  lastName!: string;

  @Column({
    name: "email",
    type: "varchar",
    length: 100,
    nullable: false,
    unique: true,
  })
  email!: string;

  @OneToMany(() => Post, (post: Post) => post.user)
  posts!: Post[];
}

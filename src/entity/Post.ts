import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//TODO Crie a entidade de Post
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  userId!: number;
}

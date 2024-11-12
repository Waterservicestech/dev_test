import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//TODO Crie a entidade de Post
@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 100 })
  description: string;

  @Column()
  userId: number;

  constructor(title: string, description: string, userId: number) {
    this.title = title;
    this.description = description;
    this.userId = userId;
  }
}

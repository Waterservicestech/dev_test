import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title: string;

  @Column()
  description: string;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }
}
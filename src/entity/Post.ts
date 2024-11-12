import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./User";

//TODO Crie a entidade de Post
@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title! : string;

  @Column()
  description! : string;  
  
  @Column()
  userId! : number; 
}
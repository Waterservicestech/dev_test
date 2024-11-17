import { Entity, Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User"

//TODO Crie a entidade de Post
@Entity('post')
export class Post {
  @PrimaryGeneratedColumn('increment')
  id : number

  @Column({ name: 'title',  length: 100, nullable: false })
  title : string

  @Column({ name: 'description',  length: 100, nullable: false })
  description : string

  @JoinColumn({ name: 'id' })
  @OneToOne(() => User)
  userId : number
}
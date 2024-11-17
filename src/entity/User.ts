import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//TODO Crie a entidade de User
@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ name: 'firstName',  length: 100, nullable: false })
  firstName: string

  @Column({ name: 'lastName',  length: 100, nullable: false })
  lastName: string

  @Column({ name: 'email',  length: 100, nullable: false })
  email: string
}
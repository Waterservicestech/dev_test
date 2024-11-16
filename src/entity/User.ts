import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  firstName: string = "";

  @Column()
  lastName: string = "";

  @Column()
  email: string = "";
}

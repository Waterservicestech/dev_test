import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { Post } from './Post';

//TODO Crie a entidade de User

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  firstName!: string;

  @Column({ type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ type: 'varchar', length: 100 })
//   ADD THIS LINE AND COMMENT THE ABOVE LINE IN CASE THE EMAIL FIELD NEEDS TO BE UNIQUE
//   @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;
}
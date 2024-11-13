import { Entity, PrimaryGeneratedColumn, Column} from "typeorm";

//TODO Crie a entidade de User

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName!:string

    @Column()
    lastName!:string

    @Column()
    email!:string
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//TODO Crie a entidade de User
@Entity("user")
export class User{
    @PrimaryGeneratedColumn("increment")
    id!: number

    @Column("varchar", {length: 100})
    firstName!: string

    @Column("varchar", {length: 100})
    lastName!: string

    @Column("varchar", {unique: true, length: 100})
    email!: string
}
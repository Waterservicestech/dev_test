import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User
{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({type: "varchar", length: 100, nullable: false})
    firstName!: string;

    @Column({type: "varchar", length: 100, nullable: false})
    lastName!: string;

    @Column({type: "varchar", length: 100, nullable: false})
    email!: string;
}
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100, nullable: false})
    firstName: string;

    @Column("varchar", { length: 100, nullable: false})
    lastName: string;

    @Column("varchar", { length: 100, nullable: false})
    email: string;
}
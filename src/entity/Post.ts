import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    userId: number
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

//TODO Crie a entidade de Post@Entity()

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number; 

    @Column({ type: 'varchar', length: 100 })
    title!: string;

    @Column({ type: 'varchar', length: 100 })
    description!: string;

    @Column()
    userId!: number; 
}

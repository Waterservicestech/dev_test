import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

@Entity('users')
export  class User {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column('varchar', { length: 100, nullable: false })
    firstName!: string;

    @Column('varchar', { length: 100, nullable: false })
    lastName!: string;

    @Column('varchar', { length: 100, nullable: false })
    email!: string;

    @OneToMany(() => Post, post => post.user, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    posts!: Post[];
}
 

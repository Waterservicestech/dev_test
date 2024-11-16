import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User }from "./User";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column('varchar', { length: 100, nullable: false })
    title!: string;

    @Column('varchar', { length: 100, nullable: false })
    description!: string;

    @ManyToOne(() => User, user => user.posts, { 
        nullable: false,
        onDelete: 'CASCADE'
     })
    user!: User;
}
 
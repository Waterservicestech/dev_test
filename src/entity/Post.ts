import { Entity, PrimaryGeneratedColumn, Column,JoinColumn,ManyToOne } from "typeorm";
import { User } from "./User";
//TODO Crie a entidade de Post
@Entity('post')
export class Post{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    title!: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    description!: string;

    @ManyToOne(() => User,user=>user.posts, { nullable: false })
    @JoinColumn({ name: 'userId' })
    user!: User;

}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import User from "./User";
//TODO Crie a entidade de Post
@Entity('posts')
class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 100, nullable: false })
    title: string;
    @Column('varchar', { length: 100, nullable: false })
    description: string;

    @ManyToOne(() => User, (user: User) => user.posts)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column('int', { nullable: false })
    userId: number; 

}

export default Post;
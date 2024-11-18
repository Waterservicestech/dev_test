import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Post from "./Post";

//TODO Crie a entidade de User
@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', { length: 100, nullable: false })
    firstName: string;
    @Column('varchar', { length: 100, nullable: false })
    lastName: string;
    @Column('varchar', { length: 100, nullable: false, unique: true })
    email: string;

    @OneToMany(() => Post, (post: Post) => post.user)
    posts: Post[];

}

export default User;
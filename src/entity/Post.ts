import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 100 })
    title!: string;

    @Column({ type: "varchar", length: 100 })
    description!: string;

    // Estabelecendo a relação 'muitos para um' com a entidade user
    @ManyToOne(() => User, (user) => user.posts)
    user!: User;
}
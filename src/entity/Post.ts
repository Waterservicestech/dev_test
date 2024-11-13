import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { User }from './User';

@Entity()
export class Post{

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100, nullable: false})
    title: string;

    @Column("varchar", { length: 100, nullable: false})
    description: string;

    @ManyToOne(() => User, (user) => user.id)
    userId: number;
}
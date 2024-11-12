import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

//TODO Crie a entidade de Post
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    userId?: number;    

    // Relacionamento muitos-para-um: Muitos posts pertencem a um único usuário
    @ManyToOne(() => User, (user) => user.posts)
    user?: User; // O usuário que criou o post

     // Construtor para inicializar as propriedades
     constructor(
        id: number,
        title: string, 
        description: string, 
        userId?: number
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.userId = userId;
    }
}
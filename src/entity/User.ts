import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./Post";

//TODO Crie a entidade de User

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number; // o ! no id é para informar ao TS que o 'id' não é nulo, mesmo sem inicialização explícita.

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    // Relacionamento um-para-muitos: Um usuário pode ter muitos posts
    @OneToMany(() => Post, (post) => post.user)
    posts: Post[] = []; // A coleção de posts do usuário e inicializando posts com um array vazio.

    // Construtor para inicializar as propriedades
    constructor(
        firstName: string, 
        lastName: string, 
        email: string
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }    
}
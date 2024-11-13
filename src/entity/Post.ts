import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

//TODO Crie a entidade de Post
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number; // o ! no id é para informar ao TS que o 'id' não é nulo, mesmo sem inicialização explícita.

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  title: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  description: string;

  @Column({ nullable: true })
  userId?: number;

  // Relacionamento muitos-para-um: Muitos posts pertencem a um único usuário
  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  user?: User;

  // Construtor para inicializar as propriedades
  constructor(title: string, description: string, userId?: number) {
    this.title = title;
    this.description = description;
    this.userId = userId;
  }
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// Entidade que representa um post.
@Entity()
export class Post {
  // ID do post.
  @PrimaryGeneratedColumn()
  id!: number;

  // Título do post.
  @Column({ length: 100 })
  title: string;

  // Descrição do post.
  @Column({ length: 100 })
  description: string;

  // ID do usuário que criou o post.
  @Column()
  userId: number;

  /**
   * Construtor da entidade Post.
   * title: Título do post.
   * description: Descrição do post.
   * userId: ID do usuário que criou o post.
   */
  constructor(title: string, description: string, userId: number) {
    this.title = title;
    this.description = description;
    this.userId = userId;
  }
}

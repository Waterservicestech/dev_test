import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"; 
import { User } from "./User";

/**
 * A entidade Post representa um post no sistema e é mapeada para a tabela 'post' no banco de dados.
 * 
 * A classe contém os campos necessários para armazenar as informações de um post, como o título, a descrição,
 * e a relação com o usuário que criou o post.
 * 
 * A entidade é associada a um usuário através da chave estrangeira 'userId', que refere-se à tabela de usuários.
 */
@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'varchar', length: 100 })
  description!: string;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "userId" })
  user!: User;
}

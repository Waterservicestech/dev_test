import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"; 

/**
 * A entidade User representa um usuário no sistema e é mapeada para a tabela 'user' no banco de dados.
 * 
 * A classe contém os campos necessários para armazenar as informações de um usuário, como o nome, sobrenome 
 * e o e-mail, que são dados essenciais para identificar um usuário na plataforma.
 */
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  firstName!: string;

  @Column({ type: 'varchar', length: 100 })
  lastName!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;
}

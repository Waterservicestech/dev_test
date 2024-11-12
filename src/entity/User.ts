import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


// Entidade que representa um usuário.
@Entity()
export class User {

  // ID do usuário.
  @PrimaryGeneratedColumn()
  id!: number;

  // Primeiro nome do usuário.
  @Column({ length: 100 })
  firstName: string;

  // Último nome do usuário.
  @Column({ length: 100 })
  lastName: string;

  // E-mail do usuário (único).
  @Column({ length: 100, unique: true })
  email: string;

  /**
   * Construtor da entidade User.
   * firstName: Primeiro nome do usuário.
   * lastName: Último nome do usuário.
   * email: E-mail do usuário.
   */
  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
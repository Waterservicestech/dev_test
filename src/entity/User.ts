import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn("increment", { type: "int" })
  private id!: number;

  @Column({ type: "varchar", length: 100, default: "" })
  private firstName!: string;

  @Column({ type: "varchar", length: 100, default: "" })
  private lastName!: string;

  @Column({ type: "varchar", length: 100, unique: true, default: "" })
  private email!: string;

  // Getters
  public getId(): number {
    return this.id;
  }
  public getFirstName(): string {
    return this.firstName || "";
  }
  public getLastName(): string {
    return this.lastName || "";
  }

  public getEmail(): string {
    return this.email || "";
  }

  // Setters
  public setFirstName(firstName: string): void {
    this.firstName = firstName;
  }
  public setLastName(lastName: string): void {
    this.lastName = lastName;
  }
  public setEmail(email: string): void {
    this.email = email;
  }
}

export default User;

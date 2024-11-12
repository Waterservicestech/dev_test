import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor(firstName: string, lastName: string, email: string){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.createdAt = new Date();
  }
}
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import User from "./User";

@Entity()
class Post {
  @PrimaryGeneratedColumn("increment", { type: "int" })
  private id!: number;

  @Column({ type: "varchar", length: 100 })
  private title!: string;

  @Column({ type: "varchar", length: 100 })
  private description!: string;

  @Column({ type: "int" })
  private userId!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  private user?: User;

  // Get's
  public getId(): number {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getDescription(): string {
    return this.description;
  }
  public getUserId(): number {
    return this.userId;
  }

  // Set's
  public setTitle(title: string): void {
    this.title = title;
  }
  public setDescription(description: string): void {
    this.description = description;
  }
  public setUserId(userId: number): void {
    this.userId = userId;
  }
}

export default Post;

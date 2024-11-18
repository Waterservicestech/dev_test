import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export class Post {
    id: number;             
    title: string;          
    description: string;    
    userId: number;         

    constructor(id: number, title: string, description: string, userId: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.userId = userId;
    }
}


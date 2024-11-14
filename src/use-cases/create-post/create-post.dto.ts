import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"

export class CreatePostDto {
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    constructor(props: { title: string, description: string, userId: number }) {
        this.title = props.title;
        this.description = props.description;
        this.userId = props.userId;
    }
}

export interface OutputPostDto {
    id: number;
    title: string;
    description: string;
    userId: number;
}
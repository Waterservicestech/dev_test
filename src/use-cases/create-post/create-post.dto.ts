import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import { User } from "../entity/User"

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
    userId: number
}
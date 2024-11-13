import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;
}
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @MinLength(2)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;

    constructor(props: { firstName: string, lastName: string, email: string }) {
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.email = props.email;
    }
}

export interface OutputUserDto {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}
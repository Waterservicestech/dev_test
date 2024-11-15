import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(85, {message: 'The firstName field must not be longer than 85 characters'})
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(85, {message: 'The lasName field must not be longer than 85 characters'})
  lastName!: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(85, {message: 'The email field must not be longer than 85 characters'})
  email!: string;
}
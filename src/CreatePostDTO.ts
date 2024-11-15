import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreatePostDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {message: 'The lasName field must not be longer than 85 characters'})
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {message: 'The lasName field must not be longer than 85 characters'})
  description!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {message: 'The lasName field must not be longer than 85 characters'})
  userId!: number;
}
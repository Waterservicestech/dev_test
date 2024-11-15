import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";


export class CreatePostDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(85, {message: 'The title field must not be longer than 85 characters'})
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(85, {message: 'The description field must not be longer than 85 characters'})
  description!: string;

  @IsNumber()
  userId!: number;
}
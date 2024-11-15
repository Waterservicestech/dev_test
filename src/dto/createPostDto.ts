import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 255, { message: 'Title must be between 1 and 255 characters' })
  title!: string;

  @IsString()
  @Length(1, 1000, { message: 'Description must be between 1 and 1000 characters' })
  description!: string;
}
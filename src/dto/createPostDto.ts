import { IsInt, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 100, { message: 'Title must be between 1 and 100 characters' })
  title!: string;

  @IsString()
  @Length(1, 100, { message: 'Description must be between 1 and 100 characters' })
  description!: string;

  @IsInt()
  userId!: number;
}
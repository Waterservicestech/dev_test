import { IsNumber, IsString, MaxLength, } from 'class-validator'
class CreatePostDto {
  @IsString()
  @MaxLength(100)
  title: string;
  @IsString()
  @MaxLength(100)
  description: string;
  @IsNumber()
  userId: number
}

export default CreatePostDto;
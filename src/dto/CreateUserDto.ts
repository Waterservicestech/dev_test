import { IsString, MaxLength } from "class-validator";

class CreateUserDto {
  @IsString()
  @MaxLength(100)
  firstName: string; 
  @IsString()
  @MaxLength(100)
  lastName: string; 
  @IsString()
  @MaxLength(100)
  email: string;
}

export default CreateUserDto;
import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 100, { message: 'First name must be between 1 and 100 characters' })
  firstName!: string;

  @IsString()
  @Length(1, 100, { message: 'Last name must be between 1 and 100 characters' })
  lastName!: string;

  @IsEmail({}, { message: 'Email is not valid' })
  email!: string;
}

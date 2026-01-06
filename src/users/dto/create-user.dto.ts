// src/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @MinLength(8, { message: 'Password must be longer than 8 characters' })
  password: string;
}
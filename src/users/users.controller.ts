// src/users/users.controller.ts
import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users') // /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register') // POST /users/register
  @UsePipes(new ValidationPipe()) // Enable validation pipe
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
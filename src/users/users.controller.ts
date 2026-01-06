// src/users/users.controller.ts
import { Controller, Get, Post, Body, UsePipes, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard('jwt'))
  @Get('profile') // GET /users/profile
  getProfile(@Request() req) {
    return req.user;
  }
}
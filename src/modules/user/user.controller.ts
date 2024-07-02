import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    const {userId} = req.user;

    return this.userService.create(createUserDto, userId);
  }

  @Get()
  findAll(@Request() req) {
    const {userId} = req.user;
    return this.userService.findAll(userId);
  }


}

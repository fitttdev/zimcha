import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDocument } from './models/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  users(): Promise<UserDocument[]> {
    return this.usersService.users();
  }

  @Get(':id')
  user(@Param('id') id: string): Promise<UserDocument> {
    return this.usersService.user(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignUp } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() UserSignUp: UserSignUp): Promise<UserEntity> {
    return await this.usersService.signup(UserSignUp)
  }

  @Post('signin')
  async signin(@Body() UserSignInDto: UserSignInDto): Promise<{
    accessToken: string;
    user: UserEntity;
}> {
    const user = await this.usersService.signin(UserSignInDto)
    const accessToken = await this.usersService.accessToken(user)
    return {
      accessToken,
      user
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

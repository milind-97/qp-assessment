import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from './../../node_modules/typeorm/browser/common/RelationType.d';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignUp } from './dto/user-signup.dto';
import {hash, compare} from 'bcryptjs'
import { UserSignInDto } from './dto/user-signin.dto';
import {sign} from 'jsonwebtoken'
@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity)
private usersRepository: Repository<UserEntity>
){}

async signup(UserSignUp: UserSignUp): Promise<UserEntity> {
 
  UserSignUp.password = await hash(UserSignUp.password,10)

const user =  this.usersRepository.create(UserSignUp)

return await this.usersRepository.save(user)
}

async signin( UserSignInDto: UserSignInDto){
  const user = await this.usersRepository
  .createQueryBuilder('users')
  .addSelect('users.password')
  .where('users.email=:email', {email: UserSignInDto.email}).getOne()
  if(!user) throw new BadRequestException('bad Credentials')
const matchPassword = await compare(UserSignInDto.password,  user.password)
  if(!matchPassword) throw new BadRequestException('bad Credentials')
    return user
}


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where:{
id: id
      }
    })
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async accessToken(user: UserEntity): Promise<string>{
    return sign({id:user.id, email: user.email},'dgfhdjgshfgsjdf',{expiresIn: '30m'})
  }
}

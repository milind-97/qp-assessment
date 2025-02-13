import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import {isArray} from 'class-validator'
import {verify} from 'jsonwebtoken'
import { UsersService } from './../../users/users.service';
import { UserEntity } from "src/users/entities/user.entity";

declare global{
  namespace Express{
    interface Request{
      currentUser?:UserEntity | null;
    }
    
  }
}
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
  constructor(private readonly UsersService: UsersService){}
  async use(req: Request, res: Response, next: NextFunction) {

const authheader = req.headers.authorization || req.headers.Authorization
if(!authheader || isArray(authheader) || !authheader.startsWith('Bearer ')){
//
req.currentUser =null
next()
}else{ 
  const token = authheader.split(' ')[1]
  const {id} = <Jwtpayload>verify(token, 'dgfhdjgshfgsjdf')
  const currentUser = await this.UsersService.findOne(+id)
  req.currentUser = currentUser
  console.log(req.currentUser,'====')
  next()
}

  }
}

interface Jwtpayload{
  id: string
}
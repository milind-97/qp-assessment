import { ArrayUnique, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserSignInDto{
  @IsNotEmpty({message: 'email cannot be empty'})
  @IsEmail({},{message: 'please provide a valid email'})
  email:string;


@IsNotEmpty({message: 'password cannot be empty'})
  password:string;
}
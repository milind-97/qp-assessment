import { PartialType } from '@nestjs/mapped-types';
import { CreateGroceryDto } from './create-grocery.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateGroceryDto extends PartialType(CreateGroceryDto) {
  @IsNotEmpty({message: 'name cannot be empty'})
      name:string;
    @IsNotEmpty({message: 'price cannot be empty'})
    price:number;
}

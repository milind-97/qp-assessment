
import { ArrayUnique, IsEmail, IsNotEmpty, IsString } from "class-validator";
export class CreateGroceryDto {
  @IsNotEmpty({message: 'name cannot be empty'})
    name:string;
  @IsNotEmpty({message: 'price cannot be empty'})
  price:number;

    description: string;
  
    inventory_count: number;
}

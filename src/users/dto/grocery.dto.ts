import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

export class GroceryDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  price: number;

  @IsNumber()
  @Min(0, { message: 'Inventory count must be greater than or equal to 0' })
  inventory_count: number;
}

export class UpdateGroceryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  price?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'Inventory count must be greater than or equal to 0' })
  inventory_count?: number;
}

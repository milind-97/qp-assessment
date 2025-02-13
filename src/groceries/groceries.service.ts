import { Injectable } from '@nestjs/common';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { GroceryEntity } from './entities/grocery.entity';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/utility/common/user-roles.enum';

@Injectable()
export class GroceriesService {
  constructor(@InjectRepository(GroceryEntity) private readonly groceryRepository:Repository<GroceryEntity>){}
 async create(createGroceryDto: CreateGroceryDto):Promise<GroceryEntity> {
    const grocery = await this.groceryRepository.create(createGroceryDto)
    return this.groceryRepository.save(grocery)
  }

  async findAll(user: any) {
    if (user.role.includes(Roles.ADMIN)) {
     
      return await this.groceryRepository.find(); 
      
    } else {
     
      return await this.groceryRepository.find({ where: { addedBy: user.id, inventory_count: MoreThan(0) } }); 
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} grocery`;
  }

  update(id: number, updateGroceryDto: UpdateGroceryDto) {
    return `This action updates a #${id} grocery`;
  }

  remove(id: number) {
    return `This action removes a #${id} grocery`;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { GroceriesService } from './groceries.service';
import { CreateGroceryDto } from './dto/create-grocery.dto';
import { UpdateGroceryDto } from './dto/update-grocery.dto';
import { GroceryEntity } from './entities/grocery.entity';
import { AuthenticationGuard } from 'src/utility/guards/authenticate.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization-guard';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('groceries')
export class GroceriesController {
  constructor(private readonly groceriesService: GroceriesService) {}

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Post()
  async create(@Body() createGroceryDto: CreateGroceryDto):Promise<GroceryEntity> {
    return await this.groceriesService.create(createGroceryDto);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN, Roles.USER]))
  @Get()
  async findAll(@Req() req) {
   
      const user = req.currentUser;
      return await this.groceriesService.findAll(user);
    }
  

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groceriesService.findOne(+id);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGroceryDto: UpdateGroceryDto) {
    return this.groceriesService.update(+id, updateGroceryDto);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groceriesService.remove(+id);
  }
}

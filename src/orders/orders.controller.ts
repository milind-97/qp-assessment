import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthenticationGuard } from 'src/utility/guards/authenticate.guard';
import { AuthorizeGuard } from 'src/utility/guards/authorization-guard';
import { Roles } from 'src/utility/common/user-roles.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.USER]))
@Post('book')
async bookGroceries(@Req() req, @Body() orderDto: { items: { groceryId: number, quantity: number }[] }) {
  const userId = req.currentUser.id;
  return await this.ordersService.createOrder(userId, orderDto.items);
}


  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { GroceryEntity } from 'src/groceries/entities/grocery.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(GroceryEntity) private groceryRepo: Repository<GroceryEntity>,
  ) {}


  async createOrder(userId: number, items: { groceryId: number, quantity: number }[]) {
    const order = this.orderRepo.create({ userId });
    await this.orderRepo.save(order);

    for (const item of items) {
      const grocery = await this.groceryRepo.findOne({ where: { id: item.groceryId } });

      if (!grocery || grocery.inventory_count < item.quantity) {
        throw new Error(`Insufficient stock for item ID ${item.groceryId}`);
      }

      grocery.inventory_count -= item.quantity;
      await this.groceryRepo.save(grocery);

      const orderItem = this.orderItemRepo.create({
        order,
        grocery,
        quantity: item.quantity,
      });
      await this.orderItemRepo.save(orderItem);
    }

    return { message: 'Order placed successfully!', orderId: order.id };
  }






  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

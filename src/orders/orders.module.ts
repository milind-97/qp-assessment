import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { GroceryEntity } from 'src/groceries/entities/grocery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, GroceryEntity])],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
 
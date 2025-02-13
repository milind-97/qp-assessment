import { Entity,Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Order } from "./order.entity";
import { GroceryEntity } from "src/groceries/entities/grocery.entity";
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.orderItems)
  order: Order;

  @ManyToOne(() => GroceryEntity)
  grocery: GroceryEntity;

  @Column()
  quantity: number;
}

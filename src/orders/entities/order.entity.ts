import { OrderItem } from "./order-item.entity";
import { Entity,Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  orderItems: OrderItem[];
}

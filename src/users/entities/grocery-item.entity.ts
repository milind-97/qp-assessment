import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('grocery_items')
export class GroceryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('text', { nullable: true })
  description: string;

  @Column('int', { default: 0 })
  inventory_count: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}

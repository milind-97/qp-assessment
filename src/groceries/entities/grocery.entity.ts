import { UserEntity } from "src/users/entities/user.entity";
import { Entity,Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('groceries')
export class GroceryEntity {
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

  @ManyToOne(()=> UserEntity, (user)=> user.groceries)
  addedBy:UserEntity
}

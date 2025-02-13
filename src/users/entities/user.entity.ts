import { GroceryEntity } from "src/groceries/entities/grocery.entity";
import { Roles } from "src/utility/common/user-roles.enum";
import { Entity,PrimaryGeneratedColumn, Column, OneToMany  } from "typeorm";

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({select: false})
  password: string;
  @Column({type:'enum', enum: Roles,array:true, default: [Roles.USER]})
  role: Roles[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
  @OneToMany(()=>GroceryEntity,(cat)=> cat.addedBy)
  groceries: GroceryEntity[]
}

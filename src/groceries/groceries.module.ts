import { Module } from '@nestjs/common';
import { GroceriesService } from './groceries.service';
import { GroceriesController } from './groceries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroceryEntity } from './entities/grocery.entity';
@Module({
   imports:[TypeOrmModule.forFeature([GroceryEntity])],
  controllers: [GroceriesController],
  providers: [GroceriesService],
  exports: [GroceriesService]
})
export class GroceriesModule {}

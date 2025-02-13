import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './utility/middlewares/current-user-middleware';
import { GroceriesModule } from './groceries/groceries.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, GroceriesModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(
      CurrentUserMiddleware
    ).forRoutes({
      path:'*',
      method: RequestMethod.ALL
    })
  }
}

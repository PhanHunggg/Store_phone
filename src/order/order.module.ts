import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { ProductRepository } from 'src/product/product.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, ProductRepository, UserRepository]
})
export class OrderModule {}

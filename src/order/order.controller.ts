import { Body, Controller, Delete, Get, Param, Post, Response } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderInterface } from './interface/create-order';

@ApiTags("Order")
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('/order-list')
  getOrderList(@Response() res: any): Promise<void> {
    return this.orderService.getOrderList(res);
  }

  @Post("/create-order")
  createOrder(@Response() res: any, @Body() body: CreateOrderInterface) {
    return this.orderService.createOrder(res, body);
  }

  @Get('/order-item-list')
  getOrderItemList(@Response() res: any): Promise<void> {
    return this.orderService.getOrderItemList(res);
  }

  @Get('/find-order/:id')
  findOrderById(@Response() res: any, @Param('id') id: string): Promise<void> {
    return this.orderService.findOrderById(res, +id);
  }

  
  @Get('/find-order-item/:id')
  findOrderItemById(@Response() res: any, @Param('id') id: string): Promise<void> {
    return this.orderService.findOrderItemById(res, +id);
  }

  @Delete('/delete-order/:id')
  deleteOrder(@Response() res: any, @Param('id') id: string) {
    return this.orderService.deleteOrder(res, +id);
  }

}

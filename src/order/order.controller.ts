import { Body, Controller, Delete, Get, Param, Post, Response } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderInterface } from './interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Order")
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('/order-list')
  findAllOrder(@Response() res: any): Promise<void> {
    return this.orderService.findAllOrder(res);
  }

  @Post("/create-order")
  createOrder(@Response() res: any, @Body() body: CreateOrderInterface) {
    return this.orderService.createOrder(res, body);
  }

  @Get('/order-item-list')
  findAllOrderItem(@Response() res: any): Promise<void> {
    return this.orderService.findAllOrderItem(res);
  }

  @Delete('/delete-order/:id')
  deleteOrder(@Response() res: any, @Param('id') id: string) {
    return this.orderService.deleteOrder(res, +id);
  }

}

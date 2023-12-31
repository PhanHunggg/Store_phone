import { Body, Controller, Delete, Get, Param, Post, Response } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderInterface } from './interface/create-order';

@ApiTags("Order")
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('/order-list')
  getOrderList(@Response() res: any) {
    return this.orderService.getOrderList(res);
    
  }

  @Post("/create-order")
  createOrder(@Response() res: any, @Body() body: CreateOrderInterface) {
    return this.orderService.createOrder(res, body);
    
  }

 

  @Get('/find-order/:id')
  findOrderById(@Response() res: any, @Param('id') id: string) {
    return this.orderService.findOrderById(res, +id);
    
  }

  
  @Get('/find-order-user/:id_user')
  findOrderByIdUser(@Response() res: any, @Param('id_user') id_user: string) {
    return this.orderService.findOrderByIdUser(res, +id_user);
    
  }

  @Delete('/delete-order/:id')
  deleteOrder(@Response() res: any, @Param('id') id: string) {
    // return this.orderService.deleteOrder(res, +id);
    
  }

}

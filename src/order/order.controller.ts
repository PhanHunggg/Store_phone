import { Body, Controller, Delete, Get, Param, Post, Response, HttpException, InternalServerErrorException } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderInterface } from './interface/create-order';
import { createCode, successCode } from 'src/response';
@ApiTags("Order")
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get('/order-list')
  async getOrderList(@Response() res: Response): Promise<Response> {
    try {
      const orders = await this.orderService.getOrderList();

      return successCode(res,orders);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Post("/create-order")
  async createOrder(@Response() res: Response, @Body() body: CreateOrderInterface): Promise<Response> {
    try {
      const order = await this.orderService.createOrder(body);

      return createCode(res, order);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Get('/find-order/:id')
  async findOrderById(@Response() res: Response, @Param('id') id: string): Promise<Response> {
    try {
      const order = await this.orderService.findOrderById(+id);

      return successCode(res, order);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Get('/find-order-user/:id_user')
  async findOrderByIdUser(@Response() res: Response, @Param('id_user') id_user: string): Promise<Response> {
    try {
      const orders = await this.orderService.findOrderByIdUser(+id_user);

      return successCode(res, orders);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  @Delete('/delete-order/:id_order')
  async deleteOrder(@Response() res: Response, @Param('id_order') id_order: string): Promise<Response> {
    try {
      await this.orderService.deleteOrder(+id_order);

      return successCode(res, '');
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
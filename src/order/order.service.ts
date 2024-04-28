import { Injectable, NotFoundException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { UserRepository } from 'src/user/user.repository';
import { OrderInterface } from './interface/order';
import { Order, User } from '@prisma/client';
import { CreateOrderDTO } from 'src/order/dto/create-order.dto';

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository,
        private userRepository: UserRepository) { }

    async getOrderList(): Promise<Order[]> {
        try {
            return await this.orderRepository.getOrderList();
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async findOrderByIdUser(id: number): Promise<Order[]> {
        try {
            const orders: Order[] = await this.orderRepository.findOrderByIdUser(id)

            if (!orders) {
                throw new NotFoundException("Không tìm thấy order!")
            }
            return orders;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async createOrder(createOrder: CreateOrderDTO): Promise<Order> {
        try {
            createOrder.id_user = Number(createOrder.id_user);

            createOrder.total = Number(createOrder.total);

            for (let i = 0; i < createOrder.productItem.length; i++) {
                createOrder.productItem[i].price = Number(createOrder.productItem[i].price)
                createOrder.productItem[i].quantity = Number(createOrder.productItem[i].quantity)
            }

            const checkUser: User = await this.userRepository.findUser(createOrder.id_user)

            if (!checkUser) {
                throw new NotFoundException("Không tìm thấy user!");
            }

            const currentDate = new Date();

            const newDataOrder: OrderInterface = {
                ...createOrder,
                created_date: currentDate
            }


            return await this.orderRepository.createOrder(newDataOrder);
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }

    }

    async deleteOrder(id: number): Promise<Order> {
        const checkOrder = await this.orderRepository.findOrderById(id);

        if (!checkOrder) {
            throw new NotFoundException("Không tìm thấy order!")
        }

        try {
            await this.orderRepository.deleteOrder(id)
            return checkOrder
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }

    async findOrderById(id: number): Promise<Order> {
        const checkOrder = await this.orderRepository.findOrderById(id);

        if (!checkOrder) {
            throw new NotFoundException("Không tìm thấy order!")
        }

        try {
            return checkOrder;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else {
                throw new InternalServerErrorException(error.message);
            }
        }
    }
}
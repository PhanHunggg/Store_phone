import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { ProductRepository } from 'src/product/product.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateOrderInterface } from './interface/create-order';
import { OrderInterface } from './interface/order';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository,
        private productRepository: ProductRepository,
        private userRepository: UserRepository) { }

    async getOrderList(): Promise<Order[]> {
        try {
            return await this.orderRepository.getOrderList();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOrderByIdUser(id: number): Promise<Order[]> {
        try {
            const order = await this.orderRepository.findOrderByIdUser(id)

            if (!order) {
                throw new NotFoundException("Không tìm thấy order!")
            }
            return order;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async createOrder(createOrder: CreateOrderInterface): Promise<Order> {
        const idUser = Number(createOrder.id_user);

        createOrder.id_user = idUser;
        createOrder.total = Number(createOrder.total);
        createOrder.id_user = idUser;

        for (let i = 0; i < createOrder.productItem.length; i++) {
            createOrder.productItem[i].price = Number(createOrder.productItem[i].price)
            createOrder.productItem[i].quantity = Number(createOrder.productItem[i].quantity)
        }

        const checkUser = await this.userRepository.findUser(idUser)

        if (!checkUser) {
            throw new NotFoundException("Không tìm thấy user!");
        }

        const currentDate = new Date();

        const newDataOrder: OrderInterface = {
            ...createOrder,
            created_date: currentDate
        }

        try {
            return await this.orderRepository.createOrder(newDataOrder);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async deleteOrder(id: number): Promise<void> {
        const checkOrder = await this.orderRepository.findOrderById(id);

        if (!checkOrder) {
            throw new NotFoundException("Không tìm thấy order!")
        }

        try {
            await this.orderRepository.deleteOrder(id)
        } catch (error) {
            throw new InternalServerErrorException(error.message);
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
            throw new InternalServerErrorException(error.message);
        }
    }
}
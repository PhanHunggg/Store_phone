import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { errCode, failCode, successCode } from 'src/response';
import { ProductRepository } from 'src/product/product.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateOrderInterface } from './interface/create-order';
import { OrderInterface } from './interface/order';

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository,
        private productRepository: ProductRepository,
        private userRepository: UserRepository) { }


    async getOrderList(res: any) {
        try {
            const checkOrderAll = await this.orderRepository.getOrderList();


            successCode(res, checkOrderAll)
        } catch (error) {
            failCode(res, error.message)
        }
    }

    async findOrderByIdUser(res: any, id: number) {
        try {
            const order = await this.orderRepository.findOrderByIdUser(id)

            if (!order) {
                errCode(res, id, "Không tìm thấy order!")
                return
            }
            successCode(res, order)
        } catch (error) {
            failCode(res, error.message)
        }
    }

    async createOrder(res: any, createOrder: CreateOrderInterface) {


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
            errCode(res, checkUser, "Không tìm thấy user!");
            return
        }

        const currentDate = new Date();


        const newDataOrder: OrderInterface = {
            ...createOrder,
            created_date: currentDate
        }

        const order = await this.orderRepository.createOrder(newDataOrder)

        successCode(res, order);

    }

    async deleteOrder(res: any, id: number): Promise<void> {
        try {

            const checkOrder = await this.orderRepository.findOrderById(id);

            if (!checkOrder) {
                errCode(res, checkOrder, "Không tìm thấy order!")
                return
            }

            await this.orderRepository.deleteOrder(id)

            successCode(res, '')
        } catch (error) {
            failCode(res, error.message)
        }
    }

    async findOrderById(res: any, id: number) {
        try {
            const checkOrder = await this.orderRepository.findOrderById(id);

            if (!checkOrder) {
                errCode(res, checkOrder, "Không tìm thấy order!")
                return
            }

            successCode(res, checkOrder)

        } catch (error) {
            failCode(res, error.message)

        }
    }

}

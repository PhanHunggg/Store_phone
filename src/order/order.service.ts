import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { errCode, failCode, successCode } from 'src/response';
import { ProductRepository } from 'src/product/product.repository';
import { UserRepository } from 'src/user/user.repository';
import { ProductInterface } from 'src/product/interface/product';
import { CreateOrderInterface } from './interface/create-order';
import { OrderInterface } from './interface/order';
import { OrderItemInterface } from './interface/order-item';

@Injectable()
export class OrderService {
    constructor(private orderRepository: OrderRepository,
        private productRepository: ProductRepository,
        private userRepository: UserRepository) { }


    async getOrderList(res: any) {
        try {
            const checkOrderAll = await this.orderRepository.getOrderList();

            if (!!!checkOrderAll.length) {
                errCode(res, '', "Không tìm thấy order nào!")
                return
            }

            successCode(res, checkOrderAll)
        } catch (error) {
            failCode(res, error.message)
        }
    }

    async getOrderItemList(res: any) {
        try {
            const checkOrderItem = await this.orderRepository.getOrderItemList();

            if (!!!checkOrderItem.length) {
                errCode(res, checkOrderItem, "Không tìm thấy sản phẩm order nào!")
                return
            }

            successCode(res, checkOrderItem)

        } catch (error) {

        }
    }

    async findOrderById(res: any, id: number) {
        try {
            const order = await this.orderRepository.findOrderById(id)

            if (!order) {
                errCode(res, id, "Không tìm thấy order!")
                return
            }
            successCode(res, order)
        } catch (error) {
            failCode(res, error.message)
        }
    }

    async findOrderItemById(res: any, id: number) {
        try {
            const order = await this.orderRepository.findOrderItemById(id)

            if (!order) {
                errCode(res, id, "Không tìm thấy orderItem!")
                return
            }
            successCode(res, order)
        } catch (error) {
            failCode(res, error.message)
        }
    }

    async createOrder(res: any, createOrder: CreateOrderInterface) {

        const checkUser = await this.userRepository.findUser(createOrder.id_user)

        if (!checkUser) {
            errCode(res, checkUser, "Không tìm thấy user!");
            return
        }

        let isValid = false;

        const arrProduct = createOrder.id_product


        for (const productId of arrProduct) {

            const checkProduct = await this.productRepository.findProduct(productId);

            if (!checkProduct) {
                isValid = true;
                break;
            }
        }

        if (isValid) {
            errCode(res, createOrder.id_product, "Không tìm thấy sản phẩm!");
            return;
        }

        const currentDate = new Date();


        const newDataOrder: OrderInterface = {
            id_user: createOrder.id_user,
            phone: createOrder.phone,
            address: createOrder.address,
            payment_method: createOrder.payment_method,
            delivery_by: createOrder.delivery_by,
            total: createOrder.total,
            created_date: currentDate
        }


        const order = await this.orderRepository.createOrder(newDataOrder)

        let newData: OrderItemInterface;

        for (const id of arrProduct) {
            newData = {
                id_order: order.id_order,
                id_product: id
            }

            await this.orderRepository.createOrderItem(newData)
        }


        successCode(res, order);
    }

    async deleteOrder(res: any, id: number): Promise<void> {
        try {

            const checkOrder = await this.orderRepository.findOrderById(id);

            if (!checkOrder) {
                errCode(res, checkOrder, "Không tìm thấy order!")
                return
            }

            const arrOrderItem = await this.orderRepository.findManyOrderItem(checkOrder.id_order)

            for (const item of arrOrderItem) {
                await this.orderRepository.deleteOrderItem(item.id_orderItem)
            }


            await this.orderRepository.deleteOrder(id)

            successCode(res, '')
        } catch (error) {
            failCode(res, error.message)
        }
    }

}

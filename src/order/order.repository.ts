import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { OrderInterface } from "./interface/order";
import { OrderItemInterface } from "./interface/order-item";

@Injectable()
export class OrderRepository {
    prisma = new PrismaClient();

    async getOrderList() {
        return await this.prisma.order.findMany({
            include: {
                OrderItem: {
                    select: {
                        id_orderItem: true,
                        product: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
    }

    async findOrderById(id: number) {
        return await this.prisma.order.findUnique({
            where: {
                id_order: id
            }
        })
    }

    async findOrderItemById(id: number) {
        return await this.prisma.orderItem.findUnique({
            where: {
                id_orderItem: id
            }
        })
    }

    async getOrderItemList() {
        return await this.prisma.orderItem.findMany()
    }

    async findManyOrderItem(id: number) {
        return await this.prisma.orderItem.findMany({
            where: {
                id_order: id
            }
        })
    }


    async createOrder(data: OrderInterface) {
        return await this.prisma.order.create({ data })
    }

    async createOrderItem(data: OrderItemInterface) {
        return await this.prisma.orderItem.create({ data })
    }


    async deleteOrderItem(id: number) {
        return await this.prisma.orderItem.delete({
            where: {
                id_orderItem: id,
            }
        })
    }

    async deleteOrder(id: number) {
        return await this.prisma.order.delete({
            where: {
                id_order: id,
            }
        })
    }

}
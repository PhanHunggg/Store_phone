import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { OrderDTO, OrderItemDTO } from "./dto";

@Injectable()
export class OrderRepository {
    prisma = new PrismaClient();

    async findAll() {
        return await this.prisma.order.findMany()
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

    async findAllOrderItem() {
        return await this.prisma.orderItem.findMany()
    }

    async findManyOrderItems(id: number) {
        return await this.prisma.orderItem.findMany({
            where: {
                id_order: id
            }
        })
    }


    async createOrder(data: OrderDTO) {
        return await this.prisma.order.create({ data })
    }

    async createOrderItem(data: OrderItemDTO) {
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
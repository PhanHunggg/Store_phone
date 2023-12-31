import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { OrderInterface } from "./interface/order";
import { OrderItemInterface } from "./interface/order-item";

@Injectable()
export class OrderRepository {
    prisma = new PrismaClient();


    async findOrderById(id: number) {
        return await this.prisma.order.findUnique({
            where: {
                id_order: id
            }
        })
    }

    async getOrderList() {
        return await this.prisma.order.findMany()
    }



    async deleteOrder(id: number) {
        return await this.prisma.order.delete({
            where: {
                id_order: id,
            }
        })
    }

    async createOrder(data: OrderInterface) {
        return await this.prisma.order.create({
            data
        })
    }

}
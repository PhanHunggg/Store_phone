import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { OrderInterface } from "./interface/order";
import { OrderItemInterface } from "./interface/order-item";

@Injectable()
export class OrderRepository {
    prisma = new PrismaClient();


    async findOrderByIdUser(id: number) {
        return await this.prisma.order.findMany({
            where: {
                id_user: id
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
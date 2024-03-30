import { PrismaClient } from "@prisma/client";
import { OrderInterface } from "./interface/order";
export declare class OrderRepository {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findOrderByIdUser(id: number): Promise<{
        id_order: number;
        id_user: number;
        phone: string;
        address: string;
        payment_method: string;
        delivery_by: string;
        total: number;
        created_date: Date;
        productItem: import(".prisma/client").Prisma.JsonValue;
        name: string;
    }[]>;
    findOrderById(id: number): Promise<{
        id_order: number;
        id_user: number;
        phone: string;
        address: string;
        payment_method: string;
        delivery_by: string;
        total: number;
        created_date: Date;
        productItem: import(".prisma/client").Prisma.JsonValue;
        name: string;
    }>;
    getOrderList(): Promise<{
        id_order: number;
        id_user: number;
        phone: string;
        address: string;
        payment_method: string;
        delivery_by: string;
        total: number;
        created_date: Date;
        productItem: import(".prisma/client").Prisma.JsonValue;
        name: string;
    }[]>;
    deleteOrder(id: number): Promise<{
        id_order: number;
        id_user: number;
        phone: string;
        address: string;
        payment_method: string;
        delivery_by: string;
        total: number;
        created_date: Date;
        productItem: import(".prisma/client").Prisma.JsonValue;
        name: string;
    }>;
    createOrder(data: OrderInterface): Promise<{
        id_order: number;
        id_user: number;
        phone: string;
        address: string;
        payment_method: string;
        delivery_by: string;
        total: number;
        created_date: Date;
        productItem: import(".prisma/client").Prisma.JsonValue;
        name: string;
    }>;
}

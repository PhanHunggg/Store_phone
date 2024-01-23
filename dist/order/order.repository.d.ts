import { PrismaClient } from "@prisma/client";
import { OrderInterface } from "./interface/order";
export declare class OrderRepository {
    prisma: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findOrderByIdUser(id: number): Promise<{
        id_order: number;
        id_user: number;
        name: string;
        phone: string;
        address: string;
        payment_method: string;
        delivery_by: string;
        total: number;
        created_date: Date;
        productItem: import(".prisma/client").Prisma.JsonValue;
    }[]>;
    findOrderById(id: number): Promise<{
        id_order: number;
        id_user: number;
        name: string;
        phone: string;
        address: string;
        payment_method: string;
        delivery_by: string;
        total: number;
        created_date: Date;
        productItem: import(".prisma/client").Prisma.JsonValue;
    }>;
    getOrderList(): Promise<{
        id_order: number;
        id_user: number;
        name: string;
        phone: string;
        address: string;
        payment_method: string;
        delivery_by: string;
        total: number;
        created_date: Date;
        productItem: import(".prisma/client").Prisma.JsonValue;
    }[]>;
    deleteOrder(id: number): Promise<{
        id_order: number;
        id_user: number;
        name: string;
        phone: string;
        address: string;
        payment_method: string;
        delivery_by: string;
        total: number;
        created_date: Date;
        productItem: import(".prisma/client").Prisma.JsonValue;
    }>;
    createOrder(data: OrderInterface): Promise<{
        id_order: number;
        id_user: number;
        name: string;
        phone: string;
        address: string;
        payment_method: string;
        delivery_by: string;
        total: number;
        created_date: Date;
        productItem: import(".prisma/client").Prisma.JsonValue;
    }>;
}

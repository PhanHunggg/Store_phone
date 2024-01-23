import { OrderService } from './order.service';
import { CreateOrderInterface } from './interface/create-order';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrderList(res: any): Promise<void>;
    createOrder(res: any, body: CreateOrderInterface): Promise<void>;
    findOrderById(res: any, id: string): Promise<void>;
    findOrderByIdUser(res: any, id_user: string): Promise<void>;
    deleteOrder(res: any, id_order: string): Promise<void>;
}
